//importar librerias
const express = require('express')
const router = express.Router()
const {validarInformacion,guardarUsuario,obtenerUsuarios,eliminarUsuario,actualizarUsuario,obtenerMecanicos} = require('../controllers/usuarios')

/**
 * Endpoint que envia los usuarios
 */
router.get('/usuarios',(req,res) => {
    obtenerUsuarios().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que envia los mecanicos
 */
router.get('/mecanicos',(req,res) => {
    obtenerMecanicos().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que guarda un usuario
 */
router.post('/usuarios',(req,res) => {
    try {
        let info = req.body
        validarInformacion(info)
        guardarUsuario(info).then(respuesta => {
            delete info.clave
            res.send({ok:true, mensaje:"El usuario se guardo correctamente", info: info})
        }).catch(error => {
            res.send(error)
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

/**
 * Endpoint que actualiza un usuario
 */
router.put('/usuarios/:id',(req,res) => {
    let info = req.body
    let id = req.params.id
    actualizarUsuario(id,info).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        res.send(error)
    })
})

/**
 * Endpoint que elimina un usuario
 */
router.delete('/usuarios/:id',(req,res) => {
    let id = req.params.id
    eliminarUsuario(id).then(respuesta => {
        res.send(respuesta)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router;