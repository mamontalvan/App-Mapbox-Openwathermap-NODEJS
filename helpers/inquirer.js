const inquirer = require('inquirer');
const colors = require('colors');

const inquirerMenu = async() => {

    const preguntas = [{
        type: 'list',
        name: 'opcion',
        message: 'Qué desea hacer?',
        choices: [{
                value: 1,
                name: `${ colors.green('1.')} Buscar ciudad`
            },
            {
                value: 2,
                name: `${ colors.green('2.')} Historial de ciudades buscadas`
            },
            {
                value: 0,
                name: `${ colors.green('0.')} Salir`
            }
        ]
    }];

    console.clear();
    console.log(colors.green("============================"));
    console.log(colors.white(" Seleccione una opción "));
    console.log(colors.green("============================\n"));

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    console.log();
    await inquirer.prompt([{
        type: 'input',
        name: 'enter',
        message: `Presione ${ colors.red('enter')} para continuar`,
    }]);

}

const leerInput = async(etiquetaAMostrar) => {
    const { textoIngresadoPorUsuario } = await inquirer.prompt([{
        type: 'input',
        name: 'textoIngresadoPorUsuario',
        message: etiquetaAMostrar,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }]);
    return textoIngresadoPorUsuario;
}

const listarLugares = async(listadoLugares = []) => {
    let indice = 0;
    //Armo el array de objetos
    const choices = listadoLugares.map((lugar) => {
        indice += 1;
        return {
            value: lugar.id,
            name: `${colors.green(indice + ':')} ${lugar.nombre}`
        }
    });

    //Agregamos la opción CANCELAR
    choices.unshift({
        value: '0',
        name: `${colors.green('Opción 0:')} Cancelar`
    });

    const listaTareas = [{
        type: 'list',
        pageSize: 20,
        name: 'idLugar',
        message: 'Seleccione lugar:',
        choices: choices
    }];

    console.log()
    const { idLugar } = await inquirer.prompt(listaTareas);

    return idLugar;
}

const confirmacion = async(preguntaSistema) => {

    const { confirmacion } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirmacion',
        message: preguntaSistema
    }]);

    return confirmacion;
}

const mostrarListadoCheckList = async(listadoTareas = []) => {
    let indice = 0;
    //Armo el array de objetos
    const choices = listadoTareas.map((tarea) => {
        indice += 1;
        return {
            value: tarea.id,
            name: `${colors.green('Tarea ' + indice + ':')} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    //Checkbox te devuelve un arreglo
    const listaTareas = [{
        type: 'checkbox',
        pageSize: 20,
        name: 'idsTareas',
        message: 'Seleccione:',
        choices: choices
    }];

    const { idsTareas } = await inquirer.prompt(listaTareas);

    return idsTareas;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmacion,
    mostrarListadoCheckList
}