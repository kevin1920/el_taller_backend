const express = require('express')
const router = express.Router()
const {validarInformacion,guardarMoto,obtenerMotos,actualizarMoto,obtenerPlacas,actualizarEstado} = require('../controllers/motos')

router.get('/motos',(req,res) => {
    obtenerMotos().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

router.get('/placas',(req,res) => {
    obtenerPlacas().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

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

module.exports = router;