document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('buscador');
    const contenedor = document.getElementById('resultados-busqueda');

    if (!input || !contenedor) {
        return;
    }

    const MAX_POR_TIPO = 5;
    let temporizador;
    let numeroBusqueda = 0;

    function crearSeccion(titulo, items, armarEnlace) {
        const encabezado = document.createElement('h4');
        encabezado.textContent = titulo;
        contenedor.appendChild(encabezado);
        items.forEach(item => contenedor.appendChild(armarEnlace(item)));
    }

    function crearEnlace(href, texto, detalle) {
        const enlace = document.createElement('a');
        enlace.href = href;
        enlace.textContent = texto;
        if (detalle) {
            const span = document.createElement('span');
            span.textContent = detalle;
            enlace.appendChild(span);
        }
        return enlace;
    }

    function mostrarResultados(artistas, canciones) {
        contenedor.replaceChildren();

        if (artistas.length === 0 && canciones.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No se encontraron resultados';
            contenedor.appendChild(mensaje);
        }
        if (artistas.length > 0) {
            crearSeccion('Artistas', artistas, a =>
                crearEnlace(`/perfil-artista.html?id=${a.id}`, a.nombre));
        }
        if (canciones.length > 0) {
            crearSeccion('Canciones', canciones, c =>
                crearEnlace(`/cancion.html?id=${c.id}`, c.titulo, c.artista));
        }
        contenedor.hidden = false;
    }

    async function buscar(texto) {
        const miBusqueda = ++numeroBusqueda;
        const q = encodeURIComponent(texto);

        try {
            const [resArtistas, resCanciones] = await Promise.all([
                fetch(`/api/artistas?q=${q}&cantidad=${MAX_POR_TIPO}`),
                fetch(`/api/canciones?q=${q}&cantidad=${MAX_POR_TIPO}`)
            ]);
            if (!resArtistas.ok || !resCanciones.ok) {
                throw new Error('El servidor respondió con un error');
            }
            const artistas = (await resArtistas.json()).data;
            const canciones = (await resCanciones.json()).data;

            // Si mientras tanto se escribió otra cosa, descartamos este resultado
            if (miBusqueda !== numeroBusqueda) {
                return;
            }
            mostrarResultados(artistas, canciones);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            contenedor.textContent = 'Hubo un error al buscar.';
            contenedor.hidden = false;
        }
    }

    function ocultarResultados() {
        contenedor.hidden = true;
    }

    input.addEventListener('input', () => {
        clearTimeout(temporizador);
        const texto = input.value.trim();

        if (texto === '') {
            numeroBusqueda++;
            contenedor.replaceChildren();
            ocultarResultados();
            return;
        }
        temporizador = setTimeout(() => buscar(texto), 300);
    });

    input.addEventListener('focus', () => {
        if (contenedor.children.length > 0) {
            contenedor.hidden = false;
        }
    });

    input.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            ocultarResultados();
        }
    });

    document.addEventListener('click', (evento) => {
        if (!evento.target.closest('.buscador')) {
            ocultarResultados();
        }
    });
});