const canciones = require('../datos-canciones');
const { contiene } = require('../utils/texto');

function generarId(titulo) {
    return titulo
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function listar(from, cantidad, busqueda = '') {
    const resultados = busqueda
        ? canciones.filter(c => contiene(c.titulo, busqueda) || contiene(c.artista, busqueda))
        : canciones;

    return {
        total: resultados.length,
        data: resultados.slice(from, from + cantidad)
    };
}

function obtenerPorId(id) {
    return canciones.find(c => c.id === id);
}

function crear(datos) {
    const id = generarId(datos.titulo);
    if (obtenerPorId(id)) {
        return null;
    }
    const nueva = { id, ...datos };
    canciones.push(nueva);
    return nueva;
}

function actualizar(id, datos) {
    const indice = canciones.findIndex(c => c.id === id);
    if (indice === -1) {
        return null;
    }
    canciones[indice] = { id, ...datos };
    return canciones[indice];
}

module.exports = { listar, obtenerPorId, crear, actualizar };