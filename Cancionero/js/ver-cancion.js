document.addEventListener('DOMContentLoaded', () => {
  
    const urlParams = new URLSearchParams(window.location.search);
    const idCancion = urlParams.get('id');

    fetch('/api/canciones?cantidad=100')
        .then(res => res.json())
        .then(data => {
            const canciones = data.data;
            
            const cancion = canciones.find(c => c.id === idCancion);
            
            if (cancion) {
                document.getElementById('titulo').textContent = cancion.titulo;
                document.getElementById('title').textContent = cancion.titulo;
                document.getElementById('artista').textContent = cancion.artista;
                document.getElementById('tonalidad').textContent = cancion.tonalidad;
                document.getElementById('letra-acordes').textContent = cancion.letraYAcordes;
                
                const imgPortada = document.getElementById('portada');
                imgPortada.src = cancion.portada;
                imgPortada.alt = `Tapa del disco de ${cancion.titulo}`;
            } else {
                console.error("Canción no encontrada en la base de datos.");
                document.getElementById('titulo').textContent = "Canción no encontrada";
            }
        })
        .catch(error => console.error("Error al obtener los datos:", error));
});