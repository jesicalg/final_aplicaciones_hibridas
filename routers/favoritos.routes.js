import express from 'express'
import * as favoritosControllers from '../controllers/favoritos.controllers.js'

const router = express.Router()
router.route('/favoritos')
    .get(favoritosControllers.viewNoUser)

router.route('/:idUser/favoritos')
    .get(favoritosControllers.find)
    .post(favoritosControllers.add)

router.route('/:idUser/favoritos/:idFavorito')    
    .get(favoritosControllers.deleteFavorito)

export default router
