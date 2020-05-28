//importar librerias
const express = require('express')
const router = express.Router()
const {validarInformacion,guardarMantenimiento,traerMantenimientoMecanico,traerMantenimientoAdmin,eliminarMantenimiento,actualizarMantenimiento} = require('../controllers/mantenimientos')

/**
 * Endpoint que envia los mantenimientos de un mecanico
 */
router.get('/mantenimientoMecanicos/:id',(req,res) => {
    let id = req.params.id
    traerMantenimientoMecanico(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que envia todos los mantenimientos
 */
router.get('/mantenimientoAdmin',(req,res) => {
    traerMantenimientoAdmin().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que guarda un mantenimiento
 */
router.post('/mantenimientos',(req,res) => {
    try {
        let info = req.body
        validarInformacion(info)
        guardarMantenimiento(info)
        res.send({ok:true, mensaje:"El usuario se guardo correctamente", info: info})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

/**
 * Endpoint que actualiza un mantenimiento
 */
router.put('/mantenimientos/:placa',(req,res) => {
    let info = req.body
    let placa = req.params.placa
    actualizarMantenimiento(placa,info).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que elimina un mantenimiento
 */
router.delete('/mantenimientos/:placa',(req,res) => {
    let placa = req.params.placa
    eliminarMantenimiento(placa).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router;