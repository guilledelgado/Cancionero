const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const rutasCanciones = require('./rutas-canciones');

app.use(express.static(path.join(__dirname, '../Cancionero')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/home.html'));
});

app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/home.html'));
});

app.get('/artistas.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/artistas.html'));
});

app.get('/canciones.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/canciones.html'));
});

app.get('/cancion.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/cancion.html'));
});

app.get('/perfil-artista.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/perfil-artista.html'));
});

app.use(express.json());
app.use('/api/canciones', rutasCanciones);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});