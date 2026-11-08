const header = document.querySelector('header');
header.innerHTML = `<div class="logo">
                    <a href="home.html"><img src="../multimedia/cancionero-logo-dorado.png" alt="Logo del sitio"></a>
                </div>
                <div class="buscador-navegacion">
                    <nav class="links-navegacion">
                        <a href="artistas.html">Artistas</a>
                        <a href="canciones.html">Canciones</a>
                    </nav>
                    <input type="search" id="buscador" placeholder="Buscar artista o canción">
                </div>`
const footer = document.querySelector('footer');
footer.innerHTML = `        <div class="footer-columnas">
            <div class="columna-footer">
                <h4>Sobre Cancionero</h4>
                <p>Cancionero es un proyecto con acordes de guitarra de bandas argentinas</p>
            </div>

            <div class="columna-footer">
                <h4>Contacto</h4>
                <a href="https://github.com/guilledelgado" target="_blank" rel="noopener noreferrer">Chicho</a>
                <a href="https://github.com/LucasZunigaG" target="_blank" rel="noopener noreferrer">Lucas</a>
                <a href="https://github.com/farielmunoz" target="_blank" rel="noopener noreferrer">Facu</a>
            </div>
        </div>
        <p class="copyright">© 2026 Cancionero</p>`
const slides = [
    {
        imagen: '../multimedia/patricio-rey-portada.jpeg',
        link: '../html/patricio-rey/patricio-rey-y-sus-redonditos-de-ricota.html'
    },
    {
        imagen: '../multimedia/soda-stereo-portada.jpg',
<<<<<<< HEAD:js/vistas.js
        link: '../html/Soda/Soda_Stereo.html'
=======
        link: '../html/soda/soda-stereo.html'
>>>>>>> ramaChichoNotebook:Cancionero/js/vistas.js
    },
    {
        imagen: '../multimedia/airbag-portada.jpg',
        link: '../html/airbag/airbag.html'
    }
];

let indiceActual = 0;

// 2. Capturamos los elementos del DOM
const imgElemento = document.getElementById('carrusel-img');
const linkElemento = document.getElementById('carrusel-link');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// 3. Función para actualizar la diapositiva en pantalla
function mostrarSlide(index) {
    // Transición de opacidad previa
    imgElemento.style.opacity = '0.3';

    setTimeout(() => {
        imgElemento.src = slides[index].imagen;
        imgElemento.alt = slides[index].alt;
        linkElemento.href = slides[index].link;
        imgElemento.style.opacity = '1';
    }, 200);
}

// 4. Funciones para avanzar/retroceder
function siguienteSlide() {
    indiceActual = (indiceActual + 1) % slides.length;
    mostrarSlide(indiceActual);
}

function anteriorSlide() {
    indiceActual = (indiceActual - 1 + slides.length) % slides.length;
    mostrarSlide(indiceActual);
}

// 5. Eventos de los botones
btnNext.addEventListener('click', siguienteSlide);
btnPrev.addEventListener('click', anteriorSlide);

// 6. Temporizador automático (cambia cada 10 segundos)
setInterval(siguienteSlide, 10000);

imgElemento.src = slides[0].imagen;
imgElemento.alt = slides[0].alt;
linkElemento.href = slides[0].link;