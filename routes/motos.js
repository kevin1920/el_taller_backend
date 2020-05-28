//importar librerias
const express = require('express')
const router = express.Router()
const {validarInformacion,guardarMoto,obtenerMotos,actualizarMoto,obtenerPlacas,actualizarEstado,eliminarMoto} = require('../controllers/motos')

/**
 * Endpoint que envia todas las motos
 */
router.get('/motos',(req,res) => {
    obtenerMotos().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que envia las placas de las motos malas
 */
router.get('/placas',(req,res) => {
    obtenerPlacas().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que guarda una moto
 */
router.post('/motos',(req,res) => {
    try {
        let info = req.body
        validarInformacion(info)
        guardarMoto(info).then(respuesta => {
            res.send({ok:true, mensaje:"La moto se guardo correctamente", info: info})
        }).catch(error => {
            res.send(error)
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

/**
 * Endpoint que actualiza una moto
 */
router.put('/motos/:id',(req,res) => {
    let info = req.body
    let id = req.params.id
    actualizarMoto(id,info).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que actualiza el estado de una moto
 */
router.put('/estado/:id',(req,res) => {
    let info = req.body
    let id = req.params.id
    actualizarEstado(id,info).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

/**
 * Endpoint que elimina una moto
 */
router.delete('/motos/:id',(req,res) => {
    let id = req.params.id
    eliminarMoto(id).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

module.exports = router;