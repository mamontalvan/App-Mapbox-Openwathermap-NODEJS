# Descripción:

Aplicación de consola que interactúa con APIs de  [Mapbox](https://www.mapbox.com/) y [Openweathermap](https://openweathermap.org/) para consumo y presentación de información del clima de un lugar determinado.

El usuario debe digitar el nombre del lugar a buscar, se hace el llamado a la API de Mapbox para traer los posibles lugares que coincidan con el término de búsqueda, luego se presentan los lugares para que el usuario seleccione el de su interés, se realiza otra llamada a la API de Openweathermap para obtener la información del clima del lugar antes seleccionado. También se implementó un historial para guardar las búsquedas de los 5 últimos lugares buscados.

Dentro del proyecto se usa los paquetes de terceros como: 
- axios: para hacer peticiones HTTP y trabaja en base promesas
- inquirer: proporciona la interfaz para el usuario
- colors: para dar color a los textos en la consola interactiva

## ❯ Requerimientos:

- Crear una cuenta en [Mapbox](https://www.mapbox.com/) y [Openweathermap](https://openweathermap.org/) y generar los Tokens respectivos para las APIs


## ❯ Install

$ npm install

## ❯ Ejecutamos

$ npm start

![split](https://github.com/terkelg/prompts/raw/master/media/split.png)

![API_NODEJS](https://user-images.githubusercontent.com/1218979/172187491-18334d30-a3f1-46d3-8629-cae75056fdad.gif)

![split](https://github.com/terkelg/prompts/raw/master/media/split.png)
