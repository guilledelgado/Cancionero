const CAMPOS_TEXTO = ['titulo', 'artista', 'album', 'letraYAcordes'];

// Son las mismas tonalidades que soporta ver-cancion.js al transponer
const TONALIDADES_MAYORES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const TONALIDADES_MENORES = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'].map(t => t + 'm');
const TONALIDADES_VALIDAS = [...TONALIDADES_MAYORES, ...TONALIDADES_MENORES];

function validarCancion(req, res, next) {
    const body = req.body ?? {};
    const errores = [];

    for (const campo of CAMPOS_TEXTO) {
        if (typeof body[campo] !== 'string' || body[campo].trim() === '') {
            errores.push(`El campo '${campo}' es obligatorio y debe ser un string no vacío`);
        }
    }

    if (!TONALIDADES_VALIDAS.includes(body.tonalidad)) {
        errores.push(`El campo 'tonalidad' es obligatorio y debe ser una de: ${TONALIDADES_VALIDAS.join(', ')}`);
    }

    const anioMaximo = new Date().getFullYear();
    if (!Number.isInteger(body.anio) || body.anio < 1900 || body.anio > anioMaximo) {
        errores.push(`El campo 'anio' es obligatorio y debe ser un número entero entre 1900 y ${anioMaximo}`);
    }

    if (body.portada !== undefined && typeof body.portada !== 'string') {
        errores.push("El campo 'portada' debe ser un string");
    }

    if (errores.length > 0) {
        return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
    }

    // Nos quedamos solo con los campos permitidos
    req.cancion = {
        titulo: body.titulo.trim(),
        artista: body.artista.trim(),
        album: body.album.trim(),
        anio: body.anio,
        tonalidad: body.tonalidad,
        portada: body.portada ?? '/multimedia/404.jpg',
        letraYAcordes: body.letraYAcordes
    };
    next();
}

module.exports = validarCancion;