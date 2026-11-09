#Acá escribo lo que voy haciendo:
#05/11/2026

Asistido por IA implementé controlar lámpara WIZ de comedor casa:
1-Modifique primero frontend (index.html)
2-Modifiqué luego frontend (main.ts)
3-Modifiqué backend index.js

Nota: en la Terminal, en Visual Studio Code, puedo ver los eventos con: docker logs -f app-fullstack-base-2026-i11-node-backend-1 (veo los seteos para la luz que envia desde navegador) 

1-Frontend html, define las barras deslizantes para controlar lamp.
2-Frontend Typescript, cerebro crea clase lamparaWiz, listeners y fetch
3-Backend, se genera endpoint app.post para lampara Wiz

Funciona pero no apaga del todo la lámpara.

#06/11/2026
Funciona pero se cambian los IPasignados por router.(DHCP creo)(Para solucionar me sugiere asociar MAC de lampara y para hacerlo mas correcto, qu esos datos se guarden en SQL)
Además, encontré que las lámparas usan protocolo UDP (el backend envía datos udp y listo. no espera respuesta)(Si la lampara esta apagada el sistema no se entera)

# DAW Base App - Changes Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).


## 2.2.0

* Project modification
    * Adds TypeScript compiler service to Docker Compose
    * Reestructures frontend folder for TypeScript
    * Adds new info to README accordingly
    * Changes project architecture image

## 2.1.0

* Project modification
    * Enhaces README accordingly to Goto IoT
    * Adds example of finished application
    * Removes unnecessary frontend images
    * Changes src code folders names

## 2.0.0

* Project modification
    * Changes project and organization names
    * Removes Typescript container
    * Removes Typescript Code
    * Executes Javascript code directly
    * Changes licence to MIT
    * Modifies README accordingly

## 1.0.0

* Project creation
    * Docker Compose implementation for whole project.
    * Typescript compilation into docker-compose.
    * MySQL 5.7 DB Server.
    * PHPMyAdmin.
    * NodeJS backend application.
    * Materialize CSS framework.
