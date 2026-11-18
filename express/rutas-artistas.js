const express = require('express');
const controller = require('./controllers/artistas.controller');
const validarPaginacion = require('./middlewares/validar-paginacion');
const validarId = require('./middlewares/validar-id');
const validarBusqueda = require('./middlewares/validar-busqueda');

const router = express.Router();

router.get('/', validarPaginacion, validarBusqueda, controller.listar);
router.get('/:id', validarId, controller.obtener);

module.exports = router;