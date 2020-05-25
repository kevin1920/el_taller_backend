const express = require('express')
const router = express.Router()
const {validarInformacion,validarLogin,generarToken,verificarToken} = require('../controllers/autenticacion')

//MIDDLEWARE: filtro
router.use((req,res,next) => {
    try {
        let url = req.url;
        if(url != "/login"){
            let token = req.headers.token;
            verificarToken(token)
        }
        next();
    } catch (error) {
        res.status(401).send({ok:false, mensaje:"No autenticado", info: error})
    }
})

/**
 * Endpoint que envia la identificacion o el correo y la contraseña para hacer el login
 */
router.post('/login',(req,res) => {
    try {
        validarInformacion(req.body)
        validarLogin(req.body).then(respuesta => {
            if(respuesta.rowCount > 0){
                let token = generarToken(respuesta.rows[0])
                res.status(200).send({ok:true, mensaje:"Usuario Autenticado", info: token, usuario:respuesta.rows[0]})
            }else{
                res.status(400).send({ok:false, mensaje:"Identificacion y/o contraseña incorrecta", info: {}})
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send(error);
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

/**
 * Endpoint que envia el token cada vez que se quiere pasar de pagina para ser validado
 */
router.get('/autenticacion',(req,res) => {
    res.status(200).send({ok:true, mensaje:"Autenticado"})
})

module.exports = router;