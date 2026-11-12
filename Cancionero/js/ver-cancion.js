document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idCancion = urlParams.get('id');

  const cancion = canciones.find(c => c.id === idCancion);

  if (cancion) {
    document.getElementById('titulo').textContent = cancion.titulo;
    document.getElementById('title').textContent = cancion.titulo;
    document.getElementById('artista').textContent = cancion.artista;
    document.getElementById('tonalidad').textContent = cancion.tonalidad;


    // Cargar la imagen de portada
    const imgPortada = document.getElementById('portada');
    imgPortada.src = cancion.portada;
    imgPortada.alt = `Tapa del disco de ${cancion.titulo}`;

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