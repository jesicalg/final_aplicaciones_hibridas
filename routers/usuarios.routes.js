import express from 'express'
import * as usuariosController from '../controllers/usuarios.controllers.js'

const router = express.Router()

router.get('/',(req,res) => {
    res.render('index', {title:'inicio',register:true, message:false})
})

router.route('/registro')
    .get(usuariosController.formRegistro)
    .post(usuariosController.create)
router.route('/login')
    .get(usuariosController.formLogin)
    .post(usuariosController.logIn)

export default router