import * as vinosService from '../services/vinos.services.js'

function formBusqueda(req,res){
    res.render('vinos/busqueda',{search:false,vinos:{},title:'Búsqueda'})
}

function searchByName(req, res){

    const filter = {
        nombre:req.body.nombre,
    }

    vinosService.traerBySearch(filter)
        .then(function(vinos){
            let busqueda=req.body.nombre 
            if(vinos==""){  

                res.render('vinos/busqueda',{search:true,vinos, busqueda, title:'Búsqueda',message:"no hay resultado para tu busqueda"})         
                 
            }else{
                console.log("Entro al controler")
                res.render('vinos/busqueda',{search:true,vinos,busqueda, title:'Búsqueda'})
                
            }

        })
        .catch(function(err){
            res.render('500',{message:"Error al realizar la busqueda"})
        })
}

function create(req,res){
    console.log(req.body.uva)
    const vino ={
        nombre: req.body.nombre,
        bodega: req.body.bodega,
        img:req.body.img,
        crianza:req.body.crianza,
        temp_serv:req.body.temp_serv,
        guarda:req.body.guarda,
        uva:req.body.uva,
        detalle_largo:req.body.detalle,
        notas:req.body.notas,
        puntuacion:req.body.puntuacion,
        region:req.body.region,
        tipo:req.body.tipo
    }
    return console.log(vino)
    vinosService.guardar(vino)
        .then(function(nuevoVino){
            res.render('vinos/ver', {nuevoVino,})
        })
        .catch(function(err){
            res.render('500',{message:"ERROR AL GUARDAR"})
        })
}

function formNuevo(req, res){

   res.render('vinos/cargar')
}

async function findById(req,res){
    console.log("entro al controlador findByid")
    const id = req.params.idVino

    const nuevoVino = await vinosService.traerVinosById(id)
    if(nuevoVino){
        res.render('vinos/ver', {nuevoVino, title:'Detalle'})
    }else{
        res.render('404', {message:'Vino no encontrado'})
    }
}

export{
    create,
    searchByName,
    formNuevo,
    formBusqueda,
    findById
}