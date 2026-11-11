const parametros = new URLSearchParams(window.location.search);
const idArtista = parametros.get('id');

// Base de datos de artistas
const artistas = [
    {
        id: 'patricio-rey',
        nombre: 'Patricio Rey y sus Redonditos de Ricota',
        imagen: '/multimedia/logo-PR.png',
        portada: '/multimedia/patricio-rey-portada.jpeg',
        idCanciones: ['etiqueta-negra', 'el-pibe-de-los-astilleros'],
        nombreCanciones: ['Etiqueta Negra', 'El pibe de los astilleros'],
        descripcion: 'Patricio Rey y sus Redonditos de Ricota fue una banda de rock argentino formada en 1976 en la ciudad de La Plata. La banda es conocida por su estilo musical único, que combina elementos de rock, punk y música experimental, así como por sus letras poéticas y enigmáticas. A lo largo de su carrera, los Redondos se convirtieron en un fenómeno cultural en Argentina, con una base de fans leales y apasionados que llenaban estadios y plazas para verlos tocar en vivo. La banda se disolvió en 2001, pero su legado musical sigue siendo influyente en la escena del rock argentino.'
    },
    {
        id: 'soda-stereo',
        nombre: 'Soda Stereo',
        imagen: '/multimedia/soda-stereo.png',
        portada: '/multimedia/soda-stereo-portada.jpg',
        idCanciones: ['de-musica-ligera', 'en-la-ciudad-de-la-furia', 'persiana-americana'],
        nombreCanciones: ['De música ligera', 'En la ciudad de la furia', 'Persiana americana'],
        descripcion: 'Soda Stereo es una banda de rock argentina formada en 1982 en Buenos Aires. Son considerados uno de los grupos más influyentes del rock latinoamericano y han tenido un impacto significativo en la escena musical argentina y regional.'
    },
    {
        id: 'airbag',
        nombre: 'Airbag',
        imagen: '/multimedia/airbag.png',
        portada: '/multimedia/airbag-portada.jpg',
        idCanciones: ['cae-el-sol', 'por-mil-noches'],
        nombreCanciones: ['Cae el sol', 'Por mil noches'],
        descripcion: 'Airbag es una banda de rock argentino formada en 1999 en Buenos Aires. La banda está compuesta por los hermanos Patricio, Gastón y Guido Sardelli. Airbag ha lanzado varios álbumes de estudio y ha ganado reconocimiento tanto a nivel nacional como internacional.'
    }
];
// Logica para cargar la pagina de cada artista dinamicamente
const portadaImg = document.querySelector('#portada');
const portadaTexto = document.querySelector('#portada-texto');

if (portadaImg && portadaTexto) {
    const datos = artistas.find(artista => artista.id === idArtista);

    if (datos) {
        portadaImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)), url('${datos.portada}')`;
        portadaTexto.textContent = datos.descripcion;

        const cancionesContainer = document.querySelector('.lista-canciones');
        if (cancionesContainer) {
            datos.idCanciones.forEach((cancion, indice) => {
                cancionesContainer.insertAdjacentHTML('beforeend', `                
                <a href="/cancion.html?id=${cancion}" class="cancion">${datos.nombreCanciones[indice]}</a>
                `);
            });
        }

    } else {
        portadaImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)),url('/multimedia/404.jpg')`;
        portadaTexto.textContent = 'Artista no encontrado';
    }
}



//Logica para cargar dinamicamente los artistas en el menu de artistas
let artistasContainer = document.querySelector('.artistas');

if (artistasContainer) {
    artistas.forEach(artista => {
        let artistaDiv = document.createElement('div');
        artistaDiv.classList.add('artista');

        let artistaLink = document.createElement('a');
        artistaLink.href = `/perfil-artista.html?id=${artista.id}`;

        let artistaImg = document.createElement('img');
        artistaImg.src = artista.imagen;
        artistaImg.alt = `Imagen de ${artista.nombre}`;

        let artistaNombre = document.createElement('p');
        artistaNombre.textContent = artista.nombre;

        artistaLink.appendChild(artistaImg);
        artistaLink.appendChild(artistaNombre);
        artistaDiv.appendChild(artistaLink);
        artistasContainer.appendChild(artistaDiv);
    });
}

// Logica para el carrusel del home

const imgElemento = document.getElementById('carrusel-img');
const linkElemento = document.getElementById('carrusel-link');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

if (imgElemento && linkElemento && btnNext && btnPrev) {
    let indiceActual = 0;
    // Función para actualizar la diapositiva en pantalla
    function mostrarSlide(index) {
        // Transición de opacidad previa
        imgElemento.style.opacity = '0.3';

        setTimeout(() => {
            imgElemento.src = artistas[index].portada;
            linkElemento.href = '/perfil-artista.html?id=' + artistas[index].id;
            imgElemento.alt = artistas[index].nombre;
            imgElemento.style.opacity = '1';
        }, 200);
    }

    // Funciones para avanzar/retroceder
    function siguienteSlide() {
        indiceActual = (indiceActual + 1) % artistas.length;
        mostrarSlide(indiceActual);
    }

    function anteriorSlide() {
        indiceActual = (indiceActual - 1 + artistas.length) % artistas.length;
        mostrarSlide(indiceActual);
    }

    // Eventos de los botones
    btnNext.addEventListener('click', siguienteSlide);
    btnPrev.addEventListener('click', anteriorSlide);

    // Temporizador automático (cambia cada 10 segundos)
    setInterval(siguienteSlide, 10000);

    imgElemento.src = artistas[0].portada;
    imgElemento.alt = artistas[0].alt;
    linkElemento.href = '/perfil-artista.html?id=' + artistas[0].id;
}