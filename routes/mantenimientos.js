const express = require('express')
const router = express.Router()
const {validarInformacion,guardarMantenimiento,traerMantenimientoMecanico,traerMantenimientoAdmin,eliminarMantenimiento,actualizarMantenimiento} = require('../controllers/mantenimientos')

router.get('/mantenimientoMecanicos/:id',(req,res) => {
    let id = req.params.id
    traerMantenimientoMecanico(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

router.get('/mantenimientoAdmin',(req,res) => {
    traerMantenimientoAdmin().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

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

router.delete('/mantenimientos/:placa',(req,res) => {
    let placa = req.params.placa
    eliminarMantenimiento(placa).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router;