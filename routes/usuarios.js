
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../Controllers/usuarios');
const { esRoleValido, esEmailValido } = require('../Helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut );

router.post('/',[
    check("correo").custom(esEmailValido),
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("password","El password debe tener minimo 6 letras").isLength({min:6}),
    check("rol").custom(esRoleValido),validarCampos
], usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;