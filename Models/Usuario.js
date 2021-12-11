const {Schema,Model,model}=require("mongoose");



const UsuarioSchema=Schema({

    nombre:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    correo:{

        type:String,
        required:[true,"El correo es obligatorio"],
        unique:true
    },
    password:{

        type:String,
        required:[true,"El password es requerido"]

    },
    img:{

        type:String

    },
    rol:{
        type:String,
        require:true
    },

    estado:{

        type:Boolean,
        default:true



    },
    google:{

        type:Boolean,
        default:false


    }

});

UsuarioSchema.methods.toJSON = function() {
    //EXTRAYENDO LA VERSION Y EL PASSWORD 
    const {__v,password, ...usuario}=this.toObject();
    //RETORNANDO TODO LO DEMAS
    return usuario;
}
module.exports=model('Usuario',UsuarioSchema);
