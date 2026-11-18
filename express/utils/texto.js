function normalizar(texto) {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function contiene(texto, busqueda) {
    return normalizar(texto).includes(normalizar(busqueda));
}

module.exports = { normalizar, contiene };