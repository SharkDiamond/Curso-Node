const {model,Schema}= require("mongoose");


const categoriaSchema=new Schema({

nombre:{
    type:String,
    required:[true,"El nombre de la categoria es obligatorio"],
    unique:true
},
estado:{

    type:Boolean,
    default:true,
    required:true

},

usuario:{

    type:Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
    
}

});

categoriaSchema.methods.toJSON= function () {
    
     //EXTRAYENDO LA VERSION Y EL PASSWORD 
     const {__v,estado,...data}=this.toObject();

     return data;


}


module.exports=model('Categoria',categoriaSchema);

