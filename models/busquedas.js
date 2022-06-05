//Importaciones de Node van al principio
const fs = require('fs');
//Importaciones de terceros van después
const axios = require('axios');
//Importaciones nuestras al último


class Busquedas {
    historial = [];
    dbPath = "./dataBase/database.json";

    constructor() {
        this.leerDataBase();
    }

    get parametrosMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get historialCapitalizado() {
            return this.historial.map((elemento) => {
                let palabras = elemento.split(' ');
                palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))

                return palabras.join(' ')

            })

        }
        //Asícrona porque se va hacer una petición HTTP
    async buscarLugar(lugarABuscar = '') {
        try {
            //Petición HTTP
            const instancia = axios.default.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugarABuscar}.json`,
                params: this.parametrosMapbox
            })

            const respuestaPeticion = await instancia.get();
            //(map): Retorna un objeto de manera implícita 
            return respuestaPeticion.data.features.map(lugarEncontrado => ({ //Retorna las ciudades o lugares que coincida con la entrada del usuario
                id: lugarEncontrado.id,
                nombre: lugarEncontrado.place_name,
                longitu: lugarEncontrado.center[0],
                latitud: lugarEncontrado.center[1],
            }))
        } catch (error) {
            console.log(error);
        }
    }

    get parametrosOpenWatherMap() {
            return {
                'appid': process.env.OPENWATHER_KEY,
                'units': 'metric',
                'lang': 'es',
            }
        }
        //Asícrona porque se va hacer una petición HTTP
    async consultarClima(latitud = '', longitud = '') {
        try {
            //Petición HTTP
            const instancia = axios.default.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.parametrosOpenWatherMap, 'lat': latitud, 'lon': longitud }
            })

            const respuestaPeticion = await instancia.get();
            const { weather, main } = respuestaPeticion.data;

            return {
                'description': weather[0].description,
                'Temperature': main.temp,
                'minTemperature': main.temp_min,
                'maxTemperature': main.temp_max
            }

        } catch (error) {

            console.log(error);
        }
    }

    registrarHistorial(lugar = '') {

        //Validar que no se graben duplicados
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0, 5);
        //Agregamos el lugar al arreglo
        this.historial.unshift(lugar.toLocaleLowerCase());

        //Guardamos en BD
        this.guardarData();

    }

    guardarData() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }


    leerDataBase() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info); //Deserializar de string a JSON object JavaScript

        this.historial = data.historial;
    }
}


module.exports = Busquedas;