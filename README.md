# Anime Character REST API

Esta API proporciona un servicio para gestionar personajes con diversas características, como raza, habilidades, y más. Puedes utilizarla para crear, leer, actualizar y eliminar personajes.

## Puedes probarlo en el siguiente link! 🚀🚀🚀
[Obtener todos los personajes](https://rest-api-anime-characters-fl0.3.us-1.fl0.io/characters)

## Uso

### Obtener todos los personajes
```
GET /characters
```
### Obtén todos los personajes disponibles o filtra por raza usando el parámetro de consulta `race`.

Ejemplo de filtro por raza:
```
GET /characters?race=saiyan
```
### Obtener un personaje por ID

```
GET /characters/:id
```
### Crear un nuevo personaje
Nota: debes proporcionar los detalles en el cuerpo de la solicitud en formato JSON.
```
POST /characters
```
### Actualizar un personaje existente
Nota: debes proporcionar los detalles en el cuerpo de la solicitud en formato JSON.
```
PATCH /characters/:id
```
### Eliminar un personaje
```
DELETE /characters/:id
```

## Requisitos

Asegúrate de tener Node.js instalado en tu sistema.

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm i` para instalar las dependencias.
3. Ejecuta `npm start` para iniciar el servidor.

## Configuración CORS

La aplicación utiliza CORS para manejar las solicitudes desde diferentes orígenes. Asegúrate de configurar correctamente los orígenes permitidos en el middleware de CORS en `anime.js`.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias de mejora, no dudes en abrir un problema o enviar un pull request.

## Autor

Andy Rojas <ar0330yt@gmail.com>
