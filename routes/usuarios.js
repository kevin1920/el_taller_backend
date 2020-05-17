const express = require('express')
const router = express.Router()
const {validarInformacion,guardarUsuario,obtenerUsuarios,eliminarUsuario,actualizarUsuario} = require('../controllers/usuarios')

router.get('/usuarios',(req,res) => {
    obtenerUsuarios().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

router.post('/usuarios',(req,res) => {
    try {
        let info = req.body
        validarInformacion(info)
        guardarUsuario(info)
        delete info.clave
        res.send({ok:true, mensaje:"El usuario se guardo correctamente", info: info})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.put('/usuarios/:id',(req,res) => {
    let info = req.body
    let id = req.params.id
    actualizarUsuario(id,info).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        res.send(error)
    })
})

router.delete('/usuarios/:id',(req,res) => {
    let id = req.params.id
    eliminarUsuario(id).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router;