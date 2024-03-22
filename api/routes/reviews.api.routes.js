import  express  from 'express'
import * as reviewsApiController from '../controllers/reviews.api.controller.js'

const router = express.Router()

router.route('/:idVino/reviews')
    .get(reviewsApiController.findByVino)
    .post(reviewsApiController.create)

router.route('/:idVino/reviews/:idReview')
    .delete(reviewsApiController.deleteReview)

export default router;