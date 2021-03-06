//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.idMecanico || !info.placa || !info.fecha){
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

let guardarMantenimiento = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into mantenimientos(id_mecanico,placa,fecha,trabajos_realizados,horas_invertidas) values($1,$2,$3,$4,$5)`
    let valores = [info.idMecanico,info.placa,info.fecha,info.trabajosRealizados,info.horasInvertidas]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene los mantenimientos para un mecanico de la base de datos
 */
let traerMantenimientoMecanico = async id => {
    let servicio = new ServicioPG()
    let sql = `select placa,fecha from mantenimientos where id_mecanico = $1 and trabajos_realizados = 'ninguno'`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene todos los mantenimientos ingresados
 */
let traerMantenimientoAdmin = async () => {
    let servicio = new ServicioPG()
    let sql = `select id_mecanico,nombre,apellidos,placa,fecha from mantenimientos
    inner join usuarios on mantenimientos.id_mecanico = usuarios.documento`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}


/**
 * Metodo que elimina un mantenimiento de la base de datos
 */
let eliminarMantenimiento = async (placa) => {
    let servicio = new ServicioPG()
    let sql = `delete from mantenimientos where placa = $1`
    let valores = [placa]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que actualiza un mantenimiento de la base de datos
 * @param {*} id 
 * @param {*} info 
 */
let actualizarMantenimiento = async (placa, info) => {
    let servicio = new ServicioPG()
    let sql = `update mantenimientos set trabajos_realizados = $1 ,horas_invertidas = $2 where placa = $3;`
    let valores = [info.trabajosRealizados,info.horasInvertidas,placa]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {validarInformacion,guardarMantenimiento,traerMantenimientoMecanico,traerMantenimientoAdmin,eliminarMantenimiento,actualizarMantenimiento}