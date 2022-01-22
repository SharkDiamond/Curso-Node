const path=require('path');
const {v4:uuidv4}=require('uuid');

const subirArchivo=(files,permitExtension=['png','yml','txt'],carpeta='')=>{

    return new Promise((resolve,reject)=>{

          // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
        const  {archivo} = files;

        const nombreCortado=archivo.name.split('.');
        //EXTENSION DEL ARCHIVO 
        const extension=nombreCortado[nombreCortado.length-1];
        //VALIDAR EXTENSIONES
        if (!permitExtension.includes(extension)) return reject(`La extension ${extension} no es permitida, ${permitExtension}`);
        //GENERANDO NOMBRE UNICO
        const nameTemp=`${archivo.name}-${uuidv4()}.${extension}`;
        
        const uploadPath =path.join( __dirname, '../uploads/',carpeta, nameTemp);
 
        // MOVIENDO EL ARCHIVO
        archivo.mv(uploadPath, function(err) {
             //EN DADO CASO DE QUE HAYA UN ERRIR
            if (err) return reject(err);
 
           resolve(nameTemp);

   });




    });
  

}


module.exports={

    subirArchivo


}