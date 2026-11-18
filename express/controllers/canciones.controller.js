const service = require('../services/canciones.service');

function listar(req, res) {
    const { cantidad, from } = req.paginacion;
    const { total, data } = service.listar(from, cantidad, req.busqueda);
    res.json({ total, cantidad, from, data });
}

function obtener(req, res) {
    const cancion = service.obtenerPorId(req.params.id);
    if (!cancion) {
        return res.status(404).json({ error: `No existe una canción con id '${req.params.id}'` });
    }
    res.json(cancion);
}

function crear(req, res) {
    const nueva = service.crear(req.cancion);
    if (!nueva) {
        return res.status(409).json({ error: `Ya existe una canción con el título '${req.cancion.titulo}'` });
    }
    res.status(201).location(`/api/canciones/${nueva.id}`).json(nueva);
}

function actualizar(req, res) {
    const actualizada = service.actualizar(req.params.id, req.cancion);
    if (!actualizada) {
        return res.status(404).json({ error: `No existe una canción con id '${req.params.id}'` });
    }
    res.json(actualizada);
}

module.exports = { listar, obtener, crear, actualizar };