const {validationResult}=require("express-validator");
const {Categoria}=require("../Models");

const validarCampos=(req,res,next)=>{


    const errors=validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json(errors).end();

    next();

}

module.exports={validarCampos};
