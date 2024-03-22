import * as usuariosService from '../../services/usuarios.service.js'
import bcrypt from 'bcryptjs'

function findById(req, res){
    const filter={
        id:req.params.idUsuario
    }
    usuariosService.findOne(filter)
    .then(function(usuario){
        if(usuario){
            res.status(200).json(usuario)
        }else{
            res.status(404).json({message:'no se encuentra el usuario indicado'})
        }
    })
}
async function create(req, res){
    const filter={
        email:req.body.email
    }
    const usuarioexist =await usuariosService.findOne(filter)
    if(usuarioexist){
       return res.status(400).json({error:'Email ya registrado'})
    }

    let salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.contraseña, salt);
    
    const usuario ={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        email:req.body.email,
        contraseña:password,        
    }

    usuariosService.guardar(usuario)
    .then(function(usuario){
        res.status(200).json(usuario.email)
    })
    .catch(function(err){
        res.status(500).json({error:'Error al registrarse'})
    })
}
async function logIn(req,res){
    const filter={
        email:req.body.email
    }
    const user = await usuariosService.findOne(filter)
    if(!user){
        return res.status(400).json({error:'Usuario no encontrado'})
    }
    const passValid = await bcrypt.compare(req.body.contraseña, user.contraseña)
    if(!passValid)return res.status(400).json({error:'contraseña no valida'})
    res.status(200).json({message:'login exitoso!'})
}

export{
    findById,
    create,
    logIn
}