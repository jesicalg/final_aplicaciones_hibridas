import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const userdb = 'admin'
const pass = 'F33Av1i108hUDPxU'
const client = new MongoClient(`mongodb+srv://admin:F33Av1i108hUDPxU@sommoslierdb.06oqgdj.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const db = client.db('sommoslierDB')

//const client = new MongoClient('mongodb://127.0.0.1:27017')
//const db = client.db('SommoslierDB_')

async function traerVinos(){
    
    return client.connect()
        .then(async function(){
            return db.collection("vinos").find().toArray()
        })
        .catch(function(err){
            console.log(err)
            return[]
        })

}
async function traerVinosById(id){
    return client.connect()
        .then(async function(){
            return db.collection("vinos").findOne({_id: new ObjectId(id) })
        })
        .catch(function(err){
            console.log(err)
            return[]
        })

}

async function traerBySearch(filter){
    filter.nombre = { $regex: filter.nombre, $options: 'i' }
    console.log(filter)
    return client.connect()
    .then(async function(){
    
        return db.collection("vinos").find(filter).toArray()
        
    })
    .catch(function(err){
        return false
    })
}

async function guardar(vino){
    const vinoNuevo={
        ...vino,
    }
    return client.connect()
    .then(function(){
        return db.collection("vinos").insertOne(vinoNuevo)
    })
    .then(function(result){
        return vinoNuevo
    })
}


export{
    traerVinos,
    traerBySearch,
    guardar,
    traerVinosById
}