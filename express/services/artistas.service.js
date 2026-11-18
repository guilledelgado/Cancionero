const artistas = require('../datos-artistas');
const canciones = require('../datos-canciones');
const { contiene } = require('../utils/texto');

function listar(from, cantidad, busqueda = '') {
    const resultados = busqueda
        ? artistas.filter(a => contiene(a.nombre, busqueda))
        : artistas;

    return {
        total: resultados.length,
        data: resultados.slice(from, from + cantidad)
    };
}

function obtenerPorId(id) {
    const artista = artistas.find(a => a.id === id);
    if (!artista) {
        return undefined;
    }
    // Las canciones del artista se arman a partir del catálogo de canciones
    const cancionesDelArtista = canciones
        .filter(c => c.artista === artista.nombre)
        .map(c => ({ id: c.id, titulo: c.titulo }));

    return { ...artista, canciones: cancionesDelArtista };
}

module.exports = { listar, obtenerPorId };