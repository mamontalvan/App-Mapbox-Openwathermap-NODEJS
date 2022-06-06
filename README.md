# Descripción Genaral:

Aplicación de consola que interactúa con APIs de Mapbox (mapbox.com) y Openweathermap (openweathermap.org) para consumo y presentación de información del clima de un determinado lugar.

El usuario debe digitar el nombre del lugar a buscar, hacemos el llamado a la API de Mapbox para traer los posibles lugares que coincidan con el término de búsqueda, presentamos los lugares y el usuario seleccionará el lugar de su interés, una vez hecho esto, se realiza otra llamada a la API de Openweathermap para obtener la información del clima que será presentada al usuario.

Dentro del proyecto se usa los paquetes de terceros como: 
- axios: para hacer peticiones HTTP y trabaja en base promesas y se lo emplea para consumo 
- inquirer: 
- colors: para dar color a los textos en la consola interactiva



