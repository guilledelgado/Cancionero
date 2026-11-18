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


const CALIDADES_MAYOR = ['', 'm', 'm', '', '', 'm', 'dis'];
const CALIDADES_MENOR = ['m', 'dis', '', 'm', 'm', '', ''];


function moverTonalidad(tonalidad, paso) {
  const esMenor = tonalidad.endsWith('m');
  const lista = esMenor ? TONALIDADES_MENORES : TONALIDADES_MAYORES;
  const tonica = esMenor ? tonalidad.slice(0, -1) : tonalidad;
  const indice = lista.indexOf(tonica);
  const nuevoIndice = (indice + paso + 12) % 12;
  return lista[nuevoIndice] + (esMenor ? 'm' : '');
}


function obtenerContextoTonal(tonalidad) {
  const esMenor = tonalidad.endsWith('m');
  const tonica = esMenor ? tonalidad.slice(0, -1) : tonalidad;

  if (!esMenor) {
    return { notas: ESCALAS_MAYORES[tonica], calidades: CALIDADES_MAYOR };
  }


  const relativaMayor = Object.values(ESCALAS_MAYORES).find(
    (escala) => escala[5] === tonica
  );
  const notasMenores = [...relativaMayor.slice(5), ...relativaMayor.slice(0, 5)];

  return { notas: notasMenores, calidades: CALIDADES_MENOR };
}

function traducirGrado(token, contexto) {

  const [parteAcorde, parteBajo] = token.split('/');


  const match = parteAcorde.match(/^([b#]?)([1-7])(.*)$/);
  if (!match) return token;
  const [, alteracion, gradoStr, modificador] = match;
  const indice = parseInt(gradoStr, 10) - 1;
  const notaBase = contexto.notas[indice] + alteracion;
  const calidadNatural = contexto.calidades[indice];

  const reemplazaTriada = /^(dis|dim|aum|aug|\+|sus|maj|m(?!aj))/i.test(modificador);
  const calidadFinal = reemplazaTriada ? modificador : calidadNatural + modificador;

  let acordeFinal = notaBase + calidadFinal;


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
      const gradoCrudo = partes[i].slice(1, -1);
      const acordeReal = traducirGrado(gradoCrudo, contexto);
      const letra = partes[i + 1] || '';
      html += crearSegmento(acordeReal, letra);
    }

    html += '<br>\n';
  }

  return html;
}


document.addEventListener('DOMContentLoaded', async () => {
  const idCancion = new URLSearchParams(window.location.search).get('id');
  const elTitulo = document.getElementById('titulo');

  if (!idCancion) {
    elTitulo.textContent = 'Falta indicar la canción';
    return;
  }

  try {
    const res = await fetch(`/api/canciones/${encodeURIComponent(idCancion)}`);

    if (res.status === 404 || res.status === 400) {
      elTitulo.textContent = 'Canción no encontrada';
      return;
    }
    if (!res.ok) {
      throw new Error(`El servidor respondió con el código ${res.status}`);
    }

    const cancion = await res.json();

    elTitulo.textContent = cancion.titulo;
    document.getElementById('title').textContent = cancion.titulo;
    document.getElementById('artista').textContent = cancion.artista;
<<<<<<< HEAD
    document.getElementById('tonalidad').textContent = cancion.tonalidad;

=======
    document.getElementById('album').textContent = cancion.album;
    document.getElementById('anio').textContent = cancion.anio;
>>>>>>> 3ddfb025465baffb3ba6791f6aea7919b431e60f

    const imgPortada = document.getElementById('portada');
    imgPortada.src = cancion.portada;
    imgPortada.alt = `Tapa del disco de ${cancion.titulo}`;

<<<<<<< HEAD
    const letra = cancion.letraYAcordes;
    const lineas = letra.split("\n");
    let htmlFinal = '';
    lineas.forEach(linea => {
      if(linea.trim()===''){
        htmlFinal += '<br>';
        return;
      }

      let lineaProcesada = linea;
      if (!lineaProcesada.startsWith('[')) {
        lineaProcesada = '[]' + lineaProcesada;
      }
      const letraFinal=letra.replace(/\[(.*?)\]([^\[]+)/g, (match, acorde, texto)=>{
        return `<span class="segmento">
                <span class="acorde">${acorde}</span>
                <span class="letra">${texto}</span>
            </span>`;
      });
      htmlFinal+=`<div class="renglon">${lineaHTML}</div>`;
    });
    
    document.querySelector('.letra-cancion').innerHTML = htmlFinal;
  
  } else {
  // Manejo de error si no existe la canción...
}
})
=======
    aplicarEfectoTapa(imgPortada);

    function aplicarEfectoTapa(elemento) {
    if (!elemento) return;
      const inclinacionMax = 14; // Grados máximos de giro (bájalo a 8 o 10 si lo quieres aún más sutil)

      imgPortada.addEventListener('mouseenter', () => {
        // Quita el retraso al entrar para que siga al mouse al instante
        imgPortada.style.transition = 'transform 0.08s ease-out, box-shadow 0.2s ease';
      });

      imgPortada.addEventListener('mousemove', (e) => {
        const rect = imgPortada.getBoundingClientRect();

        // Calcula la posición del mouse relativa al centro de la imagen (valores de -0.5 a 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Invierte Y para que se hunda el borde donde está el cursor y no al revés
        const rotarX = -y * inclinacionMax;
        const rotarY = x * inclinacionMax;

        imgPortada.style.transform = `perspective(350px) rotateX(${rotarX}deg) rotateY(${rotarY}deg) scale(0.97)`;
        imgPortada.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
      });

      imgPortada.addEventListener('mouseleave', () => {
        // Restaura la transición suave para que vuelva a su lugar sin golpes
        imgPortada.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';
        imgPortada.style.transform = 'perspective(350px) rotateX(0deg) rotateY(0deg) scale(1)';
        imgPortada.style.boxShadow = '0 4px 10px var(--color-sombra-suave)';
      });
    }


    let tonalidad = cancion.tonalidad;

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
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    elTitulo.textContent = 'Error al cargar la canción';
  }
});
>>>>>>> 3ddfb025465baffb3ba6791f6aea7919b431e60f
