const stripColors = require("colors/safe");
require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {

    const busquedas = new Busquedas();
    let opt = 0;

    do {
        //Esta función imprime el menú
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar leyenda al usuario (Ingrese lugar a buscar)
                const lugarAbuscar = await leerInput("Digite ciudad a buscar:");
                //Buscar el lugar
                const lugaresEncontrados = await busquedas.buscarLugar(lugarAbuscar);
                //Mostramos los lugares encontrados en un listado para que el usuario seleccione uno
                const idLugarSelecionado = await listarLugares(lugaresEncontrados);
                if (idLugarSelecionado === '0') continue;
                const informacionLugarSelecionado = lugaresEncontrados.find(lugarEncontrado => lugarEncontrado.id === idLugarSelecionado);
                //Guardamos el historial
                busquedas.registrarHistorial(informacionLugarSelecionado.nombre);
                const informacionClima = await busquedas.consultarClima(informacionLugarSelecionado.latitud, informacionLugarSelecionado.longitu);
                // Se mostrarán la información detallada del lugar seleccionado (clima, ubicación, etc)
                console.clear()
                console.log(stripColors.green('\nInformación de la ciudad\n'));
                console.log(stripColors.cyan("Ciudad:"), informacionLugarSelecionado.nombre);
                console.log(stripColors.cyan("Latitud:"), informacionLugarSelecionado.latitud);
                console.log(stripColors.cyan("Longitud:"), informacionLugarSelecionado.longitu);
                console.log(stripColors.cyan("Descripción del clima:"), informacionClima.description);
                console.log(stripColors.cyan("Temperatura normal:"), informacionClima.Temperature)
                console.log(stripColors.cyan("Temperatura mínima:"), informacionClima.minTemperature)
                console.log(stripColors.cyan("Temperatura máxima:"), informacionClima.maxTemperature)
                break;
            case 2:
                console.log();
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                        const idx = ` ${i + 1}`;
                        console.log(`${stripColors.gray(idx)} ${stripColors.gray(lugar)}`)
                    }

                );
                break;

            default:
                break;
        }

        if (opt !== 0) await pausa();


    } while (opt !== 0);

}

main();