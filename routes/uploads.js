const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen, mostrarImage,actualizarImagenCloudDinary } = require("../Controllers/uploads");
const { coleccionesPermitidas } = require("../Helpers");
const { validarJWT, validarArchivoSubir } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router=Router();


router.post('/',[validarJWT,validarArchivoSubir],cargarArchivo);

router.put('/:coleccion/:id',[validarJWT,validarArchivoSubir,check('id','El id debe de ser de mongo').isMongoId(),
                            check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),validarCampos],actualizarImagenCloudDinary);

router.get('/:coleccion/:id',[check('id','El id debe de ser de mongo').isMongoId(),
check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),validarCampos],mostrarImage);

module.exports=router;