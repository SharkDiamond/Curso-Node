const mongoose=require("mongoose");



const dbConection=async()=>{

    try { 
//usecreateindex, usefindandmodify
     
      await mongoose.connect(process.env.MONGODB_CNN,{
        useNewUrlParser:true,
        useUnifiedTopology:true
      });

      console.log('BASE DE DATOS ONLINE');

    } catch (error) {
        
        throw new Error("error a la hora de iniciar la base de datos "+error.message);


    }


}

module.exports={

    dbConection



}

