import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const userdb = 'admin'
const pass = 'F33Av1i108hUDPxU'
const client = new MongoClient(`mongodb+srv://admin:F33Av1i108hUDPxU@sommoslierdb.06oqgdj.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const db = client.db('sommoslierDB')

// const client = new MongoClient('mongodb://127.0.0.1:27017')
// const db = client.db('SommoslierDB_')


async function findOne(filter={}){
    if(filter.id){
        filter={_id: new ObjectId(filter.id)}
    }
    return client.connect()
    .then(async function(){
        return db.collection("Usuarios").findOne(filter)
    })
}
async function guardar(usuario){ 
    const usuarioNuevo={
        ... usuario,
    }
    return client.connect()
        .then(function(){
            return db.collection("Usuarios").insertOne(usuarioNuevo)
        })
        .then(function(result){
            return result
        })
}

export{
    findOne,
    guardar
}