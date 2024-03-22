import * as vinoFavService from '../../services/favoritos.service.js'

export async function agregarFavoritos(req, res){
    const id = req.params.idUser
    const vinoFav = {
        vino_id:req.body.vinoId,
    }
    const result = await vinoFavService.agregarVinoFav(id, vinoFav)

    res.json({message:'Agregado a favoritos'})
}

export async function traerVinoFavoritos(req, res){
    const id = req.params.idUser
    const result = await vinoFavService.traerVinoFav(id)
    res.json(result) 
}

export async function deleteVinoFav(req,res){
    const vinoId = req.params.idVino
    const userId = req.params.idUser
    
    const result =await vinoFavService.eliminarFavorito(userId, vinoId )
    res.json({message:'Eliminado de favoritos'}) 
}