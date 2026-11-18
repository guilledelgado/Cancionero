document.addEventListener('DOMContentLoaded', async () => {
    const portadaImg = document.getElementById('portada');
    const portadaTexto = document.getElementById('portada-texto');
    const listaCanciones = document.querySelector('.lista-canciones');

    if (!portadaImg || !portadaTexto || !listaCanciones) {
        return;
    }

    const fondo = (url) =>
        `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)), url('${url}')`;

    function mostrarError(mensaje) {
        portadaImg.style.backgroundImage = fondo('/multimedia/404.jpg');
        portadaTexto.textContent = mensaje;
    }

    const idArtista = new URLSearchParams(window.location.search).get('id');
    if (!idArtista) {
        mostrarError('Falta indicar el artista');
        return;
    }

    try {
        const res = await fetch(`/api/artistas/${encodeURIComponent(idArtista)}`);

        if (res.status === 404 || res.status === 400) {
            mostrarError('Artista no encontrado');
            return;
        }
        if (!res.ok) {
            throw new Error(`El servidor respondió con el código ${res.status}`);
        }

        const artista = await res.json();

        portadaImg.style.backgroundImage = fondo(artista.portada);
        portadaTexto.textContent = artista.descripcion;

        if (artista.canciones.length === 0) {
            listaCanciones.textContent = 'Todavía no hay canciones de este artista.';
            return;
        }

        artista.canciones.forEach(cancion => {
            listaCanciones.insertAdjacentHTML('beforeend', `
                <a href="/cancion.html?id=${cancion.id}" class="cancion">${cancion.titulo}</a>
            `);
        });
    } catch (error) {
        console.error('Error al obtener el artista:', error);
        mostrarError('Error al cargar el artista');
    }
});
