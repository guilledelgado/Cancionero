document.addEventListener('DOMContentLoaded', () => {
    const POR_PAGINA = 6;
    const contenedorGrid = document.getElementById('grid-canciones');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const indicador = document.getElementById('indicador-pagina');
    let paginaActual = 0;

    async function cargarPagina(pagina) {
        try {
            const from = pagina * POR_PAGINA;
            const res = await fetch(`/api/canciones?cantidad=${POR_PAGINA}&from=${from}`);
            if (!res.ok) {
                throw new Error(`El servidor respondió con el código ${res.status}`);
            }
            const { total, data } = await res.json();

            contenedorGrid.innerHTML = '';
            data.forEach(cancion => {
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

            paginaActual = pagina;
            const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
            indicador.textContent = `Página ${pagina + 1} de ${totalPaginas}`;
            btnAnterior.disabled = pagina === 0;
            btnSiguiente.disabled = from + POR_PAGINA >= total;
        } catch (error) {
            console.error('Error cargando el catálogo:', error);
            contenedorGrid.innerHTML = '<p>Hubo un error al cargar las canciones.</p>';
        }
    }

    btnAnterior.addEventListener('click', () => cargarPagina(paginaActual - 1));
    btnSiguiente.addEventListener('click', () => cargarPagina(paginaActual + 1));

    cargarPagina(0);
});


