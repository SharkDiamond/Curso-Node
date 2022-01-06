const {model,Schema}= require("mongoose");


const productoSchema=new Schema({

nombre:{
    type:String,
    required:[true,"El nombre de la categoria es obligatorio"],
    unique:true
},
estado:{

    type:Boolean,
    default:true

},
usuario:{

    type:Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
    
},
precio:{

    type:Number

},
categoria:{

    type:Schema.Types.ObjectId,
    ref:'Categoria',
    require:true

},
descripcion:{

    type:String

},
disponible:{

type:Boolean,
default:true

}

});

productoSchema.methods.toJSON= function () {
    
    //EXTRAYENDO LA VERSION Y EL PASSWORD 
    const {__v,estado,...data}=this.toObject();

    return data;


}


module.exports=model('Producto',productoSchema);