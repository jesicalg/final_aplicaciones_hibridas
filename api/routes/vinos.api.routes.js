import  express  from "express";
import * as  vinosApiControllers from '../controllers/vinos.api.controllers.js'
import reviewsApiRoutes from './reviews.api.routes.js'

const router = express.Router()

router.route('/')
    .get(vinosApiControllers.findVinos)
    .post(vinosApiControllers.create)

router.route('/:idVino')
    .get(vinosApiControllers.findById)
    //.patch(vinosApiControllers.editById)
    //.delete(vinosApiControllers.deleteById)

router.route('/search')
    .get(vinosApiControllers.search)

router.use('/', reviewsApiRoutes)

export default router