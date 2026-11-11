document.addEventListener('DOMContentLoaded', () => {
    const contenedorGrid = document.getElementById('grid-canciones');

    fetch('/api/canciones?cantidad=100')
        .then(res => res.json())
        .then(data => {
            const canciones = data.data;

            canciones.forEach(cancion => {
                const tarjeta = document.createElement('a');
                tarjeta.href = `/cancion.html?id=${cancion.id}`;
                tarjeta.className = 'tarjeta-cancion';
                
                tarjeta.innerHTML = `
                    <img src="${cancion.portada}" alt="Portada de ${cancion.titulo}">
                    <div class="info-tarjeta">
                        <h3>${cancion.titulo}</h3>
                        <p>${cancion.artista}</p>
                    </div>
                `;
                
                contenedorGrid.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error("Error cargando el catálogo:", error);
            contenedorGrid.innerHTML = "<p>Hubo un error al cargar las canciones.</p>";
        });
});