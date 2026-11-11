const express = require('express');
const canciones = require('./datos-canciones');

const router = express.Router();

function validarPaginacion(req, res, next) {
    const { cantidad = '3', from = '0' } = req.query;
    const cantidadNum = Number(cantidad);
    const fromNum = Number(from);
    if (!Number.isInteger(cantidadNum) || cantidadNum < 1) {
        return res.status(400).json({
            error: "El parámetro 'cantidad' debe ser un número entero mayor o igual a 1"
        });
    }
    if (!Number.isInteger(fromNum) || fromNum < 0) {
        return res.status(400).json({
            error: "El parámetro 'from' debe ser un número entero mayor o igual a 0"
        });
    }
    req.paginacion = { cantidad: cantidadNum, from: fromNum };
    next();
}
router.get('/', validarPaginacion, (req, res) => {
    const { cantidad, from } = req.paginacion;
    const pagina = canciones.slice(from, from + cantidad)
    res.json({ total: canciones.length, cantidad, from, data: pagina });
});

module.exports = router;
