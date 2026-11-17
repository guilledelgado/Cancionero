// document.addEventListener('DOMContentLoaded', () => {
  
//     const urlParams = new URLSearchParams(window.location.search);
//     const idCancion = urlParams.get('id');

//     fetch('/api/canciones?cantidad=100')
//         .then(res => res.json())
//         .then(data => {
//             const canciones = data.data;
            
//             const cancion = canciones.find(c => c.id === idCancion);
            
//             if (cancion) {
//                 document.getElementById('titulo').textContent = cancion.titulo;
//                 document.getElementById('title').textContent = cancion.titulo;
//                 document.getElementById('artista').textContent = cancion.artista;
//                 document.getElementById('tonalidad').textContent = cancion.tonalidad;
//                 document.getElementById('letra-acordes').textContent = cancion.letraYAcordes;
                
//                 const imgPortada = document.getElementById('portada');
//                 imgPortada.src = cancion.portada;
//                 imgPortada.alt = `Tapa del disco de ${cancion.titulo}`;
//             } else {
//                 console.error("Canción no encontrada en la base de datos.");
//                 document.getElementById('titulo').textContent = "Canción no encontrada";
//             }
//         })
//         .catch(error => console.error("Error al obtener los datos:", error));
// });


// ---------- Datos para transponer ----------
const TONALIDADES_MENORES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const TONALIDADES_MAYORES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const ESCALAS_MAYORES = {
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
};

// Calidad natural de cada grado (1 al 7) en escala mayor y menor natural
const CALIDADES_MAYOR = ['', 'm', 'm', '', '', 'm', 'dis'];
const CALIDADES_MENOR = ['m', 'dis', '', 'm', 'm', '', ''];

// ---------- Lógica de tonalidad ----------

// Sube (+1) o baja (-1) un semitono. Ej: "Bm" + 1 -> "Cm"
function moverTonalidad(tonalidad, paso) {
  const esMenor = tonalidad.endsWith('m');
  const lista = esMenor ? TONALIDADES_MENORES : TONALIDADES_MAYORES;
  const tonica = esMenor ? tonalidad.slice(0, -1) : tonalidad;
  const indice = lista.indexOf(tonica);
  const nuevoIndice = (indice + paso + 12) % 12;
  return lista[nuevoIndice] + (esMenor ? 'm' : '');
}

// Obtiene las 7 notas y calidades de una tonalidad (ej: 'D' o 'Bm')
function obtenerContextoTonal(tonalidad) {
  const esMenor = tonalidad.endsWith('m');
  const tonica = esMenor ? tonalidad.slice(0, -1) : tonalidad;

  if (!esMenor) {
    return { notas: ESCALAS_MAYORES[tonica], calidades: CALIDADES_MAYOR };
  }

  // Si es menor, busca su relativa mayor y rota desde el 6to grado
  const relativaMayor = Object.values(ESCALAS_MAYORES).find(
    (escala) => escala[5] === tonica
  );
  const notasMenores = [...relativaMayor.slice(5), ...relativaMayor.slice(0, 5)];

  return { notas: notasMenores, calidades: CALIDADES_MENOR };
}

// Convierte un grado con modificadores (ej: "6dis", "4sus4", "1maj7", "46/6")
// al acorde real en la tonalidad elegida.
function traducirGrado(token, contexto) {
  // Soporta inversiones con barra, ej: "46/6" -> acorde "46" con bajo en "6"
  const [parteAcorde, parteBajo] = token.split('/');

  // alteración opcional (b/#) + número de grado (1-7) + resto (sus4, maj7, dis, 7...)
  const match = parteAcorde.match(/^([b#]?)([1-7])(.*)$/);
  if (!match) return token; // acordes escritos a mano (ej: "Am") pasan sin transponer

  const [, alteracion, gradoStr, modificador] = match;
  const indice = parseInt(gradoStr, 10) - 1;
  const notaBase = contexto.notas[indice] + alteracion;
  const calidadNatural = contexto.calidades[indice];

  // Si el modificador redefine la tríada (dis, dim, sus, aum, maj, m) reemplaza la calidad natural.
  // Si es solo una extensión (7, 9, 6, add9) conserva la calidad natural.
  const reemplazaTriada = /^(dis|dim|aum|aug|\+|sus|maj|m(?!aj))/i.test(modificador);
  const calidadFinal = reemplazaTriada ? modificador : calidadNatural + modificador;

  let acordeFinal = notaBase + calidadFinal;

  // Si había bajo invertido (ej: "/6"), agrega solo la nota del bajo
  if (parteBajo) {
    const matchBajo = parteBajo.match(/^([b#]?)([1-7])$/);
    if (matchBajo) {
      const notaBajo = contexto.notas[parseInt(matchBajo[2], 10) - 1] + matchBajo[1];
      acordeFinal += `/${notaBajo}`;
    }
  }

  return acordeFinal;
}

function crearSegmento(acorde, letra) {
  return `<span class="segmento"><span class="acorde">${acorde}</span><span class="letra">${letra}</span></span>`;
}

// Genera el HTML completo de la canción en la tonalidad indicada
function generarHTMLCancion(texto, tonalidad) {
  const contexto = obtenerContextoTonal(tonalidad);
  const lineas = texto.split('\n');
  let html = '';

  for (const linea of lineas) {
    if (linea.trim() === '') {
      html += '<br>\n';
      continue;
    }

    const partes = linea.split(/(\[[^\]]+\])/);

    if (partes[0] !== '') {
      html += crearSegmento('', partes[0]);
    }

    for (let i = 1; i < partes.length; i += 2) {
      const gradoCrudo = partes[i].slice(1, -1); // quita '[' y ']'
      const acordeReal = traducirGrado(gradoCrudo, contexto);
      const letra = partes[i + 1] || '';
      html += crearSegmento(acordeReal, letra);
    }

    html += '<br>\n';
  }

  return html;
}

// ---------- Página ----------
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idCancion = urlParams.get('id');

  fetch('/api/canciones?cantidad=100')
    .then(res => res.json())
    .then(data => {
      const cancion = data.data.find(c => c.id === idCancion);

      if (!cancion) {
        console.error("Canción no encontrada en la base de datos.");
        document.getElementById('titulo').textContent = "Canción no encontrada";
        return;
      }

      document.getElementById('titulo').textContent = cancion.titulo;
      document.getElementById('title').textContent = cancion.titulo;
      document.getElementById('artista').textContent = cancion.artista;

      const imgPortada = document.getElementById('portada');
      imgPortada.src = cancion.portada;
      imgPortada.alt = `Tapa del disco de ${cancion.titulo}`;

      let tonalidad = cancion.tonalidad;

      // Muestra la tonalidad actual y re-dibuja la letra con los acordes transpuestos
      function mostrarCancion() {
        document.getElementById('tonalidad').textContent = tonalidad;
        document.querySelector('.letra-cancion').innerHTML =
          generarHTMLCancion(cancion.letraYAcordes, tonalidad);
      }

      document.getElementById('disminuirTonalidad').addEventListener('click', () => {
        tonalidad = moverTonalidad(tonalidad, -1);
        mostrarCancion();
      });

      document.getElementById('aumentarTonalidad').addEventListener('click', () => {
        tonalidad = moverTonalidad(tonalidad, 1);
        mostrarCancion();
      });

      document.getElementById('resetearTonalidad').addEventListener('click', () => {
        tonalidad = cancion.tonalidad;
        mostrarCancion();
      });

      mostrarCancion();
    })
    .catch(error => console.error("Error al obtener los datos:", error));
});