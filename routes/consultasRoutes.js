const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultasController');

router.post('/', async (req, res, next) => {
    try {
        await consultaController.createConsulta(req, res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;