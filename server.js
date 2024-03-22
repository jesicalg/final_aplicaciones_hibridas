import express from 'express'
import vinosApiRoutes from './api/routes/vinos.api.routes.js'
import vinosRoutes from './routers/vinos.routes.js'
import usuariosVinosRoute from './api/routes/usuarios.api.routes.js'
import usuariosRoute from './routers/usuarios.routes.js'
import vinoFavApiRoutes from'./api/routes/favoritos.api.routes.js'
import favoritosRoutes from './routers/favoritos.routes.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', express.static('public'))

app.use('/api/vinos', vinosApiRoutes)
app.use(vinosRoutes)
app.use(vinoFavApiRoutes)
app.use('/api/usuarios', usuariosVinosRoute)
app.use(usuariosRoute)
app.use(favoritosRoutes)

app.listen(2019, function(){
    console.log('Servidor ON! http://localhost:2019')
})