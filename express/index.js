const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const cancionesRoutes = require('./rutas-canciones');
const artistasRoutes = require('./rutas-artistas');
const loginRoutes = require('./ruta-login');
const { notFoundApi, errorHandler } = require('./middlewares/errores');


const app = express();
const port = 3000;
const carpetaFront = path.join(__dirname, '../Cancionero');

//Logica para sesiones
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({
        secret: 'Boca es el mas grande', //palabra secreta para firmar las cookies
        resave: false, //evita que el servidor vuelva a guardar la sesión en la memoria si no hubo ningún cambio durante la petición
        saveUninitialized: false,//crea una sesión nueva incluso para usuarios que solo entraron a mirar y todavía no iniciaron sesión.
        cookie: { //configuracion de la cookie
            path: '/',//para que funcione en todas las rutas
            httpOnly: true,//seguridad, impide que lean la cookie
            secure: false, //secure exige conexion https
            maxAge: 1000*60*60*24 //para que dure 24 hs
        },
    })
);
app.use('/', loginRoutes);
app.use(express.static(carpetaFront));

app.get('/', (req, res) => {
    res.sendFile(path.join(carpetaFront, 'html', 'home.html'));
});

['home', 'artistas', 'canciones', 'cancion', 'perfil-artista', 'inicio-sesion'].forEach(pagina => {
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