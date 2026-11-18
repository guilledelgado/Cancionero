function validarId(req, res, next) {
    const { id } = req.params;
    if (!/^[a-z0-9-]+$/.test(id)) {
        return res.status(400).json({
            error: "El 'id' solo puede tener letras minúsculas, números y guiones (ej: de-musica-ligera)"
        });
    }
    next();
}

module.exports = validarId;