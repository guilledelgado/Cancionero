const service = require('../services/artistas.service');

function listar(req, res) {
    const { cantidad, from } = req.paginacion;
    const { total, data } = service.listar(from, cantidad, req.busqueda);
    res.json({ total, cantidad, from, data });
}

function obtener(req, res) {
    const artista = service.obtenerPorId(req.params.id);
    if (!artista) {
        return res.status(404).json({ error: `No existe un artista con id '${req.params.id}'` });
    }
    res.json(artista);
}

module.exports = { listar, obtener };