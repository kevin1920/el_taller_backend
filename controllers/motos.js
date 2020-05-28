//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.placa || !info.estado || !info.clase || !info.marca || !info.modelo || 
        !info.color || !info.cilindraje || !info.idPropietario || !info.nroSoat || !info.vencimientoSoat || !info.nroTecnomecanica || !info.venTecnomecanica){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}

/**
 * Metodo que guarda una moto en la base de datos
 * @param {*} info 
 */

let guardarMoto = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into motos (placa,estado,clase,marca,modelo,color,cilindraje,id_propietario,nro_soat,vencimiento_soat,nro_tecnomecanica,vencimiento_tecnomecanica)
    values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`
    let valores = [info.placa,info.estado,info.clase,info.marca,info.modelo,info.color,info.cilindraje,info.idPropietario,info.nroSoat,info.vencimientoSoat,info.nroTecnomecanica,info.venTecnomecanica]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene las motos de la base de datos
 */
let obtenerMotos = async () => {
    let servicio = new ServicioPG()
    let sql = `select placa,estado,clase,marca,modelo,color,cilindraje,id_propietario,nro_soat,vencimiento_soat,nro_tecnomecanica,vencimiento_tecnomecanica from motos order by placa`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que obtiene las placas de las motos que estan malas
 */
let obtenerPlacas = async ()  => {
    let servicio = new ServicioPG()
    let sql = `select placa from motos where estado = 'mala'`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que actualiza una moto de la base de datos
 * @param {*} id 
 * @param {*} info 
 */
let actualizarMoto = async (id, info) => {
    let servicio = new ServicioPG()
    let sql = `update motos set estado = $1,clase = $2,marca = $3,modelo = $4,color = $5,cilindraje = $6,id_propietario = $7,nro_soat = $8,vencimiento_soat = $9,nro_tecnomecanica = $10,vencimiento_tecnomecanica = $11
    where placa = $12;`
    let valores = [info.estado,info.clase,info.marca,info.modelo,info.color,info.cilindraje,info.idPropietario,info.nroSoat,info.vencimientoSoat,info.nroTecnomecanica,info.venTecnomecanica,id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que actualiza el estado de una moto en la base de datos
 * @param {*} id 
 * @param {*} info 
 */
let actualizarEstado = async (id, info) => {
    let servicio = new ServicioPG()
    let sql = `update motos set estado = $1 where placa = $2;`
    let valores = [info.estado,id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que elimina una moto de la base de datos
 * @param {*} id 
 */
let eliminarMoto = async (id) => {
    let servicio = new ServicioPG()
    let sql = `delete from motos where placa = $1`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}


module.exports = {validarInformacion,guardarMoto,obtenerMotos,actualizarMoto,obtenerPlacas,actualizarEstado,eliminarMoto}