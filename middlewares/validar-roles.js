

const esAdminRole= (req,res,next)=>{

    if (!req.usuario) res.status(500).json({msg:"Se quiere verificar el role sin validar el token primero"}).end();
    
    if (req.usuario.rol!=="ADMIN_ROLE") res.status(401).json("El usuario no tiene un rol de administrador").end();

    next();

}

const tieneRol=(...roles)=>{

    return (req,res,next)=>{
         console.log(roles);
         
         if (!req.usuario) res.status(500).json({msg:"Se quiere verificar el role sin validar el token primero"}).end();
    
         if (!roles.includes(req.usuario.rol)) res.status(401).json("El usuario no tiene un rol valido").end();

        next();

    }

}

module.exports={esAdminRole,tieneRol};
