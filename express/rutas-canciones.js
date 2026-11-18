// const express = require('express');
// const canciones = require('./datos-canciones');

// const router = express.Router();

// function validarPaginacion(req, res, next) {
//     const { cantidad = '3', from = '0' } = req.query;
//     const cantidadNum = Number(cantidad);
//     const fromNum = Number(from);
//     if (!Number.isInteger(cantidadNum) || cantidadNum < 1) {
//         return res.status(400).json({
//             error: "El parámetro 'cantidad' debe ser un número entero mayor o igual a 1"
//         });
//     }
//     if (!Number.isInteger(fromNum) || fromNum < 0) {
//         return res.status(400).json({
//             error: "El parámetro 'from' debe ser un número entero mayor o igual a 0"
//         });
//     }
//     req.paginacion = { cantidad: cantidadNum, from: fromNum };
//     next();
// }
// router.get('/', validarPaginacion, (req, res) => {
//     const { cantidad, from } = req.paginacion;
//     const pagina = canciones.slice(from, from + cantidad)
//     res.json({ total: canciones.length, cantidad, from, data: pagina });
// });

// module.exports = router;

const express = require('express');
const controller = require('./controllers/canciones.controller');
const validarPaginacion = require('./middlewares/validar-paginacion');
const validarId = require('./middlewares/validar-id');
const validarBusqueda = require('./middlewares/validar-busqueda');
const validarCancion = require('./middlewares/validar-cancion');

const router = express.Router();

router.get('/', validarPaginacion, validarBusqueda, controller.listar);
router.get('/:id', validarId, controller.obtener);
router.post('/', validarCancion, controller.crear);
router.put('/:id', validarId, validarCancion, controller.actualizar);

module.exports = router;
