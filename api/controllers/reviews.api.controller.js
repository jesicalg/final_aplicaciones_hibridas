import * as reviewsService from '../../services/reviews.service.js'

async function create(req,res){
    const vinoId = req.params.idVino
    const review ={
        text:req.body.text,
    }
    const newReview = await reviewsService.create(vinoId, review);
    res.status(201).json(newReview)
}   

async function findByVino(req, res) {
    const vinoId = req.params.idVino;

    const reviews = await reviewsService.findAll(vinoId)
    res.status(200).json(reviews);
}

async function deleteReview(req,res){
    const reviewId = req.params.idReview;

    const result = await reviewsService.eliminarReview(reviewId)
    res.json({ message: 'eliminado', result })
    
}

export{
    create, 
    findByVino,
    deleteReview
}