
//IMPORTACIONES INTERNAS
const Server = require('./Models/Server');
require('dotenv').config();
//CREANDO EL OBJETO SERVER
const server=new Server();

//ESCUCHANDO EN EL PUERTO
server.Escuchar();