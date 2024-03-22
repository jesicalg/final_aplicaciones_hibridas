import express from 'express'

import * as usuariosApiControllers from '../controllers/usuarios.api.controllers.js'

const router = express.Router()

router.route('/register')
    .post(usuariosApiControllers.create)
router.route('/login')
    .post(usuariosApiControllers.logIn)
export default router