const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const rutaUsuarios = path.join(__dirname, 'usuarios.json');

router.post('/inicio-sesion', (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({ exito: false, mensaje: 'Falta usuario o contraseña' });
    }

    const txtusuarios = fs.readFileSync(rutaUsuarios, 'utf-8');
    const listausuarios = JSON.parse(txtusuarios);
    const usuarioEncontrado = listausuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
    if (usuarioEncontrado) {
        req.session.usuario = usuarioEncontrado.usuario;
        res.json({ exito: true });
    } else {
        res.status(401).json({ exito: false, mensaje: 'Usuario y/o contraseña incorrectos' });
    }
});

router.post('/registro', (req, res) => {
    const { usuario, email, contraseña } = req.body;

    if (!usuario || !email || !contraseña) {
        return res.status(400).json({ exito: false, mensaje: 'Falta usuario, email o contraseña' });
    }

    const txtusuarios = fs.readFileSync(rutaUsuarios, 'utf-8');
    const listausuarios = JSON.parse(txtusuarios);
    const usuarioEncontrado = listausuarios.some(u => u.usuario === usuario || u.email === email);
    if (!usuarioEncontrado) {
        listausuarios.push({ usuario, email, contraseña });
        const nuevoContenido = JSON.stringify(listausuarios, null, 2);
        fs.writeFileSync(rutaUsuarios, nuevoContenido, 'utf-8');
        req.session.usuario = usuario;
        res.status(201).json({ exito: true });
    } else {
        res.status(401).json({ exito: false, mensaje: 'Usuario y/o mail existentes' });
    }
});

router.get('/sesion', (req, res) => {
    if (req.session && req.session.usuario) {
        res.json({ logueado: true, usuario: req.session.usuario });
    } else {
        res.json({ logueado: false });
    }
});

router.post('/cerrar-sesion', (req, res) => {
    if (req.session && req.session.usuario) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ exito: false, mensaje: 'Error al cerrar sesión' });
            }
            res.clearCookie('connect.sid'); 
            res.json({ exito: true });
        });
    } else {
        res.status(401).json({ exito: false, mensaje: 'No hay una sesion activa' });
    }
});

module.exports = router;