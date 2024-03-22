import * as usuariosService from '../services/usuarios.service.js'
import bcrypt from 'bcryptjs'


function formRegistro(req,res){
    res.render('usuarios/cargar', {register:true, message:false})
}

function formLogin(req,res){
    res.render('usuarios/cargar', {register:false, message:false})
}

async function create(req, res){
    if(req.body.nombre==="" || req.body.email==="" || req.body.contraseña===""){
        return res.render('usuarios/cargar',{register:true, message:'No puede haber campos vacios'})
    }


    const filter={
        email:req.body.email
    }
    const usuarioexist = await usuariosService.findOne(filter)
    if(usuarioexist){
        return res.render('usuarios/cargar',{register:true, message:'Email ya registrado'})
    }

    let salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.contraseña, salt);
    const usuario ={
        nombre:req.body.nombre,
        email:req.body.email,
        contraseña:password
    }

    usuariosService.guardar(usuario)
    .then(function(usuario){
        res.redirect('/login')
    })
    .catch(function(err){
        res.render('500', {message:"error al registrarse"})
    })
}

async function logIn(req,res){
    if(req.body.email==="" || req.body.contraseña===""){
        return res.render('usuarios/cargar',{register:false, message:'No puede haber campos vacios'})
    }
    const filter={
        email:req.body.email
    }
    
    const user = await usuariosService.findOne(filter)
    if(!user){
        return res.render('usuarios/cargar',{register:false,message:'Usuario no encontrado'})
    }
    
    const passValid = await bcrypt.compare(req.body.contraseña, user.contraseña)
    if(!passValid)return res.render('usuarios/cargar',{register:false, message:'Contraseña no valida'})
    res.render('home',{title:'Home',user:user._id})
}

export{
    formRegistro,
    create,
    logIn,
    formLogin
}