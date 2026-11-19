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

app.use('/api/canciones', cancionesRoutes);
app.use('/api/artistas', artistasRoutes);
app.use('/api', notFoundApi);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});