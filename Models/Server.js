const express = require('express');
const cors= require('cors');
const path=require('path');
const fileUpload=require('express-fileupload');

const {dbConection}=require('../db/config');

class Server{

    constructor(){

        this.ConectarDB();

        this.app=express();

        //Middlewares
        this.middlewares();

        this.authPath='/api/auth';
        
        this.path={
          usuarios:"/Users",
          categorias:"/api/categorias",
          productos:"/api/productos",
          autenticacion:"/api/auth",
          busqueda:"/api/buscar",
          archivos:"/api/uploads"
        };

        this.routes();
        
    }


    middlewares(){
       
       this.app.use(express.json());
        
       this.app.use(cors());
        //SERVIR CONTENIDO ESTATICO
       this.app.use(express.static('public'));

      // Note that this option available for versions 1.0.0 and newer. 
      this.app.use(fileUpload({
          useTempFiles : true,
          tempFileDir : '/tmp/'
      }));

   
    }


    routes(){
      //RUTA PARA USUARIOS
      this.app.use("/Users",require("../routes/usuarios"));
      //RUTA PARA AUTENTICACION
      this.app.use(this.authPath,require("../routes/auth"));
      //RUTA PARA LA CATEGORIAS
      this.app.use("/api/categorias",require("../routes/categorias"));
      //RUTA PARA PRODUCTOS
      this.app.use("/api/productos",require("../routes/productos"));
      //RUTA PARA BUSCAR
      this.app.use("/api/buscar",require("../routes/buscar"));
      //SUBIR ARCHIVOS
      this.app.use("/api/uploads",require("../routes/uploads"));
      //RUTA PARA MOSTRAR LOS ARCHIVOS DEL SERVER
      this.app.use('/*',(req,res)=>{

        res.sendFile(path.join("/home/gabriel/Desktop/Cursos/Nodejs/Curso-Node/","public","index.html"));
        
      });
    } 

    Escuchar(){
       //PUERTO DE ESCUCHA
      this.app.listen(8080);

    }

    async ConectarDB(){

        await dbConection();

    }


}


module.exports=Server;