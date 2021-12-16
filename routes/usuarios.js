
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../Controllers/usuarios');
const { esRoleValido, esEmailValido, existeUsuarioPorID } = require('../Helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRol } = require('../middlewares/validar-roles');

const router = Router();

router.get('/',[check("limit","El limite tiene que ser un valor numerico").isNumeric(),check("desde","El desde tiene que ser un valor numerico").isNumeric(),validarCampos],usuariosGet);

router.put('/:id',[

check('id','No es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorID),
check("rol").custom(esRoleValido),
validarCampos
],usuariosPut);

router.post('/',[
    check("correo").custom(esEmailValido),
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("password","El password debe tener minimo 6 letras").isLength({min:6}),
    check("rol").custom(esRoleValido),validarCampos
], usuariosPost);

router.delete('/:id',[validarJWT,tieneRol('ADMIN_ROLE','USER_ROLE'),   
check('id','No es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorID),
validarCampos,],usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;