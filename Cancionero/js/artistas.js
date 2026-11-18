document.addEventListener('DOMContentLoaded', () => {
    const POR_PAGINA = 6;
    const contenedorGrid = document.getElementById('grid-artistas');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const indicador = document.getElementById('indicador-pagina');
    let paginaActual = 0;

    async function cargarPagina(pagina) {
        try {
            const from = pagina * POR_PAGINA;
            const res = await fetch(`/api/artistas?cantidad=${POR_PAGINA}&from=${from}`);
            if (!res.ok) {
                throw new Error(`El servidor respondió con el código ${res.status}`);
            }
            const { total, data } = await res.json();

            contenedorGrid.innerHTML = '';
            data.forEach(artista => {
                const item = document.createElement('li');
                item.innerHTML = `
                    <a href="/perfil-artista.html?id=${artista.id}" class="tarjeta-artista">
                        <img src="${artista.imagen}" alt="${artista.nombre}">
                        <h3>${artista.nombre}</h3>
                    </a>
                `;
                contenedorGrid.appendChild(item);
            });

            paginaActual = pagina;
            const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
            indicador.textContent = `Página ${pagina + 1} de ${totalPaginas}`;
            btnAnterior.disabled = pagina === 0;
            btnSiguiente.disabled = from + POR_PAGINA >= total;
        } catch (error) {
            console.error('Error cargando los artistas:', error);
            contenedorGrid.innerHTML = '<li>Hubo un error al cargar los artistas.</li>';
        }
    }

    btnAnterior.addEventListener('click', () => cargarPagina(paginaActual - 1));
    btnSiguiente.addEventListener('click', () => cargarPagina(paginaActual + 1));

    cargarPagina(0);
});