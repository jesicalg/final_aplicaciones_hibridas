import express from 'express'
import * as vinosController from '../controllers/vinos.controllers.js'

const router = express.Router()

router.get('/home',(req,res) => {
    res.render('home', {title:'Home',register:true, message:false, user:false})
})

router.route('/vinos/nuevo')
    .get(vinosController.formNuevo)
    .post(vinosController.create)

router.route('/vinos/busqueda')
    .get(vinosController.formBusqueda)
    .post(vinosController.searchByName)

router.route('/vinos/:idVino')
    .get(vinosController.findById)

export default router