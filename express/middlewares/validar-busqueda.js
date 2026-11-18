function validarBusqueda(req, res, next) {
    const { q } = req.query;

    // La búsqueda es opcional: sin 'q' se devuelven todos
    if (q === undefined) {
        req.busqueda = '';
        return next();
    }

    if (typeof q !== 'string') {
        return res.status(400).json({ error: "El parámetro 'q' debe ser un texto" });
    }

    const texto = q.trim();
    if (texto.length > 100) {
        return res.status(400).json({ error: "El parámetro 'q' no puede tener más de 100 caracteres" });
    }

    req.busqueda = texto;
    next();
}

module.exports = validarBusqueda;