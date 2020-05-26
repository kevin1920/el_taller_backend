const express = require('express')
const router = express.Router()
const {validarInformacion,obtenerConsolidado} = require('../controllers/consolidados')

router.post('/consolidados',(req,res) => {
    try {
        let fechas = req.body
        validarInformacion(fechas)
        obtenerConsolidado(fechas).then(respuesta => {
            res.send(respuesta.rows)
        }).catch(error => {
            res.send(error)
        })
    } catch (error) {
        
        res.send(error)
    }
})

module.exports = router;