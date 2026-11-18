document.addEventListener('DOMContentLoaded', async () => {
    const imgElemento = document.getElementById('carrusel-img');
    const linkElemento = document.getElementById('carrusel-link');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (!imgElemento || !linkElemento || !btnPrev || !btnNext) {
        return;
    }

    let artistas = [];
    try {
        const res = await fetch('/api/artistas?cantidad=5&from=0');
        if (!res.ok) {
            throw new Error(`El servidor respondió con el código ${res.status}`);
        }
        artistas = (await res.json()).data;
    } catch (error) {
        console.error('Error cargando el carrusel:', error);
        return;
    }

    if (artistas.length === 0) {
        return;
    }

    let indiceActual = 0;

    function mostrarSlide(index) {
        imgElemento.style.opacity = '0.3';

        setTimeout(() => {
            imgElemento.src = artistas[index].portada;
            linkElemento.href = '/perfil-artista.html?id=' + artistas[index].id;
            imgElemento.alt = artistas[index].nombre;
            imgElemento.style.opacity = '1';
        }, 200);
    }

    function siguienteSlide() {
        indiceActual = (indiceActual + 1) % artistas.length;
        mostrarSlide(indiceActual);
    }

    function anteriorSlide() {
        indiceActual = (indiceActual - 1 + artistas.length) % artistas.length;
        mostrarSlide(indiceActual);
    }

    btnNext.addEventListener('click', siguienteSlide);
    btnPrev.addEventListener('click', anteriorSlide);

    setInterval(siguienteSlide, 10000);

    // Primer slide
    imgElemento.src = artistas[0].portada;
    imgElemento.alt = artistas[0].nombre;
    linkElemento.href = '/perfil-artista.html?id=' + artistas[0].id;
});