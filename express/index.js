const express = require('express');
const path = require('path');
const cancionesRoutes = require('./rutas-canciones');
const artistasRoutes = require('./rutas-artistas');
const { notFoundApi, errorHandler } = require('./middlewares/errores');

const app = express();
const port = 3000;
const carpetaFront = path.join(__dirname, '../Cancionero');

app.use(express.json());
app.use(express.static(carpetaFront));

app.get('/', (req, res) => {
    res.sendFile(path.join(carpetaFront, 'html', 'home.html'));
});

['home', 'artistas', 'canciones', 'cancion', 'perfil-artista'].forEach(pagina => {
    app.get(`/${pagina}.html`, (req, res) => {
        res.sendFile(path.join(carpetaFront, 'html', `${pagina}.html`));
    });
});

<<<<<<< HEAD
app.get('/artistas.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/artistas.html'));
});

app.get('/canciones.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/canciones.html'));
});

app.get('/patricio-rey/patricio-rey-y-sus-redonditos-de-ricota.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/patricio-rey/patricio-rey-y-sus-redonditos-de-ricota.html'));
});

app.get('/soda/soda-stereo.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/soda/soda-stereo.html'));
});

app.get('/airbag/airbag.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/airbag/airbag.html'));
});
=======
app.use('/api/canciones', cancionesRoutes);
app.use('/api/artistas', artistasRoutes);
app.use('/api', notFoundApi);
app.use(errorHandler);
>>>>>>> 3ddfb025465baffb3ba6791f6aea7919b431e60f

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});