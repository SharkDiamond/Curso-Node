const {check}= require('express-validator');
const {Router}= require('express');
const { createProduct, deleteProduct,getProducto, getProductos,updateProducto } = require('../Controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {existeCategoriaPorId, existeProducto, existeProductoId } = require('../Helpers/db-validators');

const router=Router();

//CREAR PRODUCTO
router.post('/create',[validarJWT,esAdminRole,check("nombre","El nombre es necesario!").not().isEmpty().custom(existeProducto),
                                  check("precio","El precio del producto es necesario!").not().isEmpty().isInt().withMessage("El precio debe ser de tipo numerico"),
                                  check("categoria","La categoria no es un id de mongo").isMongoId().custom(existeCategoriaPorId),
                                  validarCampos],createProduct);
//ELIMINAR PRODUCTO
router.delete('/delete/:id',[validarJWT,esAdminRole,check("id").custom(existeProductoId),validarCampos],deleteProduct);
//ACTUALIZAR PRODUCTO
router.put('/actualizar/:id',[validarJWT,esAdminRole,check("id").custom(existeProductoId),validarCampos],updateProducto);
//OBTENER PRODUCTO
router.get('/obtener/:id',[validarJWT,check("id","No es un id de mongo").custom(existeProductoId),validarCampos],getProducto);
//OBTENER PRODUCTOS
router.get('/obtenerVarios',[validarJWT],getProductos);



module.exports=router;
