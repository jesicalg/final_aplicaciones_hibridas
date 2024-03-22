import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

// const userdb = 'admin'
// const pass = 'F33Av1i108hUDPxU'
// const client = new MongoClient(`mongodb+srv://admin:F33Av1i108hUDPxU@sommoslierdb.06oqgdj.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
// const db = client.db('sommoslierDB')

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('SommoslierDB_')
const cReviews = db.collection('Reviews')

async function create(idVino, review){
    const reviewNew ={
        ...review,
        vino_id: new ObjectId(idVino)
    }
    return client.connect()
    .then( function(){
        return  cReviews.insertOne(reviewNew)
    })
    .then(function(result){
        return reviewNew
    })  
}

async function findAll(idVino){

    return client.connect()
    .then(function(){
        return cReviews.find({vino_id:new ObjectId(idVino)}).toArray()
    })
}
async function eliminarReview(idReview){
    return client.connect()
    .then(function(){
        return cReviews.deleteOne({_id:new ObjectId(idReview)})
    })
}

export{
    findAll,
    create,
    eliminarReview
}