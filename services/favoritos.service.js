import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

// const userdb = 'admin'
// const pass = 'F33Av1i108hUDPxU'
// const client = new MongoClient(`mongodb+srv://admin:F33Av1i108hUDPxU@sommoslierdb.06oqgdj.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
// const db = client.db('sommoslierDB')

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('SommoslierDB_')
const cFavoritos = db.collection('Favoritos')

async function agregarVinoFav(userId, vinoFav){
    return client.connect()
    .then(async function(){
        return cFavoritos.updateOne({user_id:new ObjectId(userId)},{$addToSet:{vinos:vinoFav}})
    })
    .then(function(result){
        if(result.matchedCount===0){
            return cFavoritos.insertOne({user_id:new ObjectId(userId), vinos:[vinoFav]})
        }
    })
}
async function traerVinoFav(idUser){
    return client.connect()
    .then(async function(){
        return cFavoritos.findOne({user_id:new ObjectId(idUser)})
    })
}
async function traerVinoFavAll(){
    return client.connect()
    .then(async function(){
        return cFavoritos.find().toArray()
    })
}
async function eliminarFavorito(userId, idVino){
    return client.connect()
    .then(async function(){
        return cFavoritos.updateOne({user_id:new ObjectId(userId)},{$pull:{vinos:{vino_id:idVino}}})
    })
}
export{
    agregarVinoFav,
    traerVinoFav,
    eliminarFavorito,
    traerVinoFavAll
}