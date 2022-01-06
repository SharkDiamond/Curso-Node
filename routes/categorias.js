const {Router}=require('express');
const {check}=require('express-validator');
const { createCategoria, getCategoria, deleteCategoria, updateCategoria, getCategorias } = require('../Controllers/categorias');
const {validarJWT, validarCampos, esAdminRole}=require("../middlewares");
const {existeCategoriaPorId} = require("../Helpers/db-validators");

const router=Router();

// OBTENER TODAS LAS CATEGORIAS - PUBLICO
router.get('/',[validarJWT],getCategorias);
// OBTENER UNA CATEGORIA POR ID - PUBLICO 
router.get('/:id',[validarJWT,check("id","No es un id de mongo valido").isMongoId(),
                  check('id').custom(existeCategoriaPorId),validarCampos],getCategoria);
// CREAR CATEGORIA - PRIVADO - CUALQUIER PERSONA CON UN TOKEN VALIDO
router.post('/',[validarJWT,check('nombre',"El nombre es obligatorio!").not().isEmpty()
                ,check('id').custom(existeCategoriaPorId),validarCampos],createCategoria);
//ACTUALIZAR UNA CATEGORIA POR ID - PRIVADO - CUALQUIER PERSONA CON UN TOKEN VALIDO
router.put('/:id',[validarJWT,check('nombre','El nombre es obligatrio').not().isEmpty(),check("id","No es un id de mongo valido").isMongoId(),
check("id").custom(existeCategoriaPorId),validarCampos],updateCategoria);
//BORRAR UAN CATEGORIA POR ID - PRIVADO - CUALQUIER PERSONA CON UN TOKEN VALIDO - ADMIN
router.delete('/:id',[validarJWT,esAdminRole,check("id","No es un id de mongo valido").isMongoId(),
check("id").custom(existeCategoriaPorId),validarCampos],deleteCategoria);

module.exports=router;