//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Validar informacion que se quiere insertar
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.fechaInferior || !info.fechaSuperior){
        throw {
            ok:false, 
            mensaje:"Se debe ingresar un rango de fechas"
        };
    }
}

/**
 * Metodo que obtiene informacion de la base de datos
 */
let obtenerConsolidado = async info => {
    let servicio = new ServicioPG()
    let sql = `select id_mecanico,nombre,apellidos,sum(horas_invertidas)as horasTrabajadas from mantenimientos
    inner join usuarios on mantenimientos.id_mecanico = usuarios.documento
    where fecha between $1 and $2 group by id_mecanico,nombre,apellidos`
    let valores = [info.fechaInferior,info.fechaSuperior]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {validarInformacion,obtenerConsolidado}