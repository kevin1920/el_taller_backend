//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')

let secret_key = process.env.SECRET_KEY

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.documento || !info.clave){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}

/**
 * Metodo que verifica la indentificacion y la clave en la base de datos
 * @param {*} info 
 */
let validarLogin = async info => {
    let servicio = new ServicioPG()
    let sql = `select usuarios.nombre as nombre,roles.nombre as rol from usuarios
    inner join roles on usuarios.rol = roles.id
    where documento = $1 and clave = md5($2)`
    let valores = [info.documento,info.clave]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que genera el token 
 * @param {*} usuario 
 */
let generarToken = (usuario) => {
    delete usuario.contraseña;
    let token = jwt.sign(usuario,secret_key)
    return token;
}

/**
 * Metodo que verifica el token
 * @param {*} token 
 */
let verificarToken = token => {
    return jwt.verify(token,secret_key);
}

module.exports = {validarInformacion,validarLogin,generarToken,verificarToken}