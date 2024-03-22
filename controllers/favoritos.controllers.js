import * as favoritosService from '../services/favoritos.service.js'

export async function add(req,res){
    const user_id = req.params.idUser
    const vino = {
        vino_id : req.body.vino
    }
    const result = await favoritosService.agregarVinoFav(user_id, vino_id)

    res.render('vinos/`${vino_id}`')
}
export async function viewNoUser(req,res){
    res.render('vinos/favoritos',{message:'Si querés agregar listas te invitamos a registrarte para formar parte de esta gran comunidad que es "Sommoslier"', vinos:{},title:"Favoritos"})
}
export async function find(req,res){
        
    const vinos = await favoritosService.traerVinoFavAll()
    if(!vinos) return res.render('vinos/favoritos',{message:'No tenes favoritos aún'})

    res.render('vinos/favoritos',{message:'', vinos})
}

export async function deleteFavorito(req,res){
    const user_id = req.params.idUser
    const vino_id = req.params.idVino

    const result = await favoritosService(user_id,vino_id)

    if(!result)return res.render('500', {message:'Error al eliminar el producto'})

    res.redirect('/home')

}