import express from 'express'
import * as vinoFavApiController from '../controllers/favoritos.api.controller.js'
const router = express.Router()

router.route('/api/users/:idUser/favoritos')
    .post(vinoFavApiController.agregarFavoritos)
    .get(vinoFavApiController.traerVinoFavoritos)

router.route('/api/users/:idUser/favoritos/:idVino')
    .delete(vinoFavApiController.deleteVinoFav)

export default router