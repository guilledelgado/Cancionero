const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

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

app.get('/patricio-rey/patricio-rey-y-sus-redonditos-de-ricota.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/patricio-rey/patricio-rey-y-sus-redonditos-de-ricota.html'));
});

app.get('/soda/soda-stereo.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/soda/soda-stereo.html'));
});

app.get('/airbag/airbag.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Cancionero/html/airbag/airbag.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});