document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idCancion = urlParams.get('id');

  const cancion = canciones.find(c => c.id === idCancion);

  if (cancion) {
    document.getElementById('titulo').textContent = cancion.titulo;
    document.getElementById('title').textContent = cancion.titulo;
    document.getElementById('artista').textContent = cancion.artista;
    document.getElementById('tonalidad').textContent = cancion.tonalidad;
    document.getElementById('letra-acordes').textContent = cancion.letraYAcordes;

    // Cargar la imagen de portada
    const imgPortada = document.getElementById('portada');
    imgPortada.src = cancion.portada;
    imgPortada.alt = `Tapa del disco de ${cancion.titulo}`;
  } else {
    // Manejo de error si no existe la canción...
  }
});