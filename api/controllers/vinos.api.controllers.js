import * as vinosServices from'../../services/vinos.services.js'

function findVinos(req, res){
    vinosServices.traerVinos()
    .then(vinos=>{
        res.status(200).json(vinos)
    })
}
function search(req, res){

    const filter = req.query

    vinosServices.traerBySearch(filter)
    .then(vinos=>{
        res.status(200).json(vinos)
    })
}

function create(req,res){
    const vino ={
        nombre: req.body.nombre,
        bodega: req.body.bodega,
        img:req.body.img,
        crianza:req.body.crianza,
        temp_serv:req.body.temperatura,
        guarda:req.body.guarda,
        uva:req.body.uva,
        detalle_largo:req.body.detalle,
        notas:req.body.notas,
        puntuacion:req.body.puntuacion,
        region:req.body.region,
        tipo:req.body.tipo
    }
    vinosServices.guardar(vino)
        .then(function(nuevoVino){
            res.status(201).json(nuevoVino)
        })
        .catch(function(err){
            res.status(500).json(err)
        })
}

function findById(req,res){
    const id = req.params.findVinos
    const vino ={}

    valid('nombre', req.body.nombre)
    valid('bodega', eq.body.bodega)
    valid('img', req.body.img)
    valid('crianza', req.body.crianza)
    valid('temperatura', req.body.temperatura)

    function valid(name,parametro){

        if(parametro){
            vino.name= parametro
        }
    }
}


export{
    findVinos,
    search,
    create,
    findById
}