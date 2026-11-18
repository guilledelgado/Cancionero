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
