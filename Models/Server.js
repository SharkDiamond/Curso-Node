const express = require('express');
const cors= require('cors');
const path=require('path');
const {dbConection}=require('../db/config');

class Server{

    constructor(){

        this.ConectarDB();

        this.app=express();

        //Middlewares
        this.middlewares();

        this.authPath='/api/auth';

        this.routes();
        
    }


    middlewares(){
       
       this.app.use(express.json());
        
       this.app.use(cors());
        //SERVIR CONTENIDO ESTATICO
       this.app.use(express.static('public'));
   
    }


    routes(){
       
      //RUTA PARA BOLETOS
      this.app.use("/Users",require("../routes/usuarios"));

      this.app.use(this.authPath,require("../routes/auth"));

      this.app.use("/api/categorias",require("../routes/categorias"));

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