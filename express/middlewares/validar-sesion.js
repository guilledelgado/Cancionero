function validarSesion(req, res, next) {
    if (req.session && req.session.usuario) {
        return next(); // Tiene sesión activa, pasa al controlador
    }
    return res.status(401).json({ exito: false, mensaje: 'Tenés que iniciar sesión para realizar esta acción' });
}

module.exports = validarSesion;