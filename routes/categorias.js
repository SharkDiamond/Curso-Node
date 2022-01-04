const {Router}=require('express');
const {check}=require('express-validator');
const {validarCampos}=require("../middlewares/validar-campos");


const router=Router();


// OBTENER TODAS LAS CATEGORIAS - PUBLICO
router.get('/',(req,res)=>{
    
    res.json('get');
});
// OBTENER UNA CATEGORIA POR ID - PUBLICO
router.get('/:id',(req,res)=>{
    
    res.json('CATEGORIA POR ID');
});
// CREAR CATEGORIA - PRIVADO - CUALQUIER PERSONA CON UN TOKEN VALIDO
router.post('/',(req,res)=>{
    
    res.json('POST');
});
//ACTUALIZAR UNA CATEGORIA POR ID - PRIVADO - CUALQUIER PERSONA CON UN TOKEN VALIDO
router.put('/:id',(req,res)=>{

    res.json('UPDATE');

});
//BORRAR UAN CATEGORIA POR ID - PRIVADO - CUALQUIER PERSONA CON UN TOKEN VALIDO - ADMIN
router.delete('/:id',(req,res)=>{

    res.json('DELETE');

});

module.exports=router;