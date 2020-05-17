//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.tipoDocumento || !info.documento || !info.nombre || !info.apellidos || !info.celular || !info.correo || !info.rol || !info.clave){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}

/**
 * Metodo que guarda en la base de datos la informacion
 * @param {*} info 
 */

let guardarUsuario = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into usuarios(tipo_documento,documento,nombre,apellidos,celular,correo,rol,clave) 
    values($1,$2,$3,$4,$5,$6,$7,md5($8))`
    let valores = [info.tipoDocumento,info.documento,info.nombre,info.apellidos,info.celular,info.correo,info.rol,info.clave]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene informacion de la base de datos
 */
let obtenerUsuarios = async () => {
    let servicio = new ServicioPG()
    let sql = `select tipos_documentos.nombre as tipo_documento, documento,usuarios.nombre,apellidos,celular,correo,roles.nombre as rol from usuarios
    inner join tipos_documentos on usuarios.tipo_documento = tipos_documentos.id
    inner join roles on usuarios.rol = roles.id;`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que elimina informacion de la base de datos
 */
let eliminarUsuario = async (id) => {
    let servicio = new ServicioPG()
    let sql = `delete from usuarios where documento = $1`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que actualiza informacion de la base de datos
 * @param {*} id 
 * @param {*} info 
 */
let actualizarUsuario = async (id, info) => {
    let servicio = new ServicioPG()
    let sql = `UPDATE usuarios
	SET tipo_documento = $1,nombre = $2,apellidos = $3,celular = $4,correo = $5,rol = $6,clave = $7
    WHERE documento = $8;`
    let valores = [info.tipoDocumento,info.nombre,info.apellidos,info.celular,info.correo,info.rol,info.clave,id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {validarInformacion,guardarUsuario,obtenerUsuarios,eliminarUsuario,actualizarUsuario}