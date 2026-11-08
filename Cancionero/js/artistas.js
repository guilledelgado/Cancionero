const artistas = [
    {
        nombre: 'Patricio Rey y sus Redonditos de Ricota',
        imagen: '../multimedia/logo-PR.png',
        link: '../html/patricio-rey/patricio-rey-y-sus-redonditos-de-ricota.html'
    },
    {
        nombre: 'Soda Stereo',
        imagen: '../multimedia/soda-stereo.png',
        link: '../html/soda/soda-stereo.html'
    },
    {
        nombre: 'Airbag',
        imagen: '../multimedia/airbag.png',
        link: '../html/airbag/airbag.html'
    }
];

let artistasContainer = document.querySelector('.artistas');

artistas.forEach(artista => {
    let artistaDiv = document.createElement('div');
    artistaDiv.classList.add('artista');

    let artistaLink = document.createElement('a');
    artistaLink.href = artista.link;

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