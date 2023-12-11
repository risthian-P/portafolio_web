// importaciones
const express = require('express')
const path = require('path');
const { engine }  = require('express-handlebars')


// inicializar
// instanciar express
const app = express()

// Configuraciones 
// Variables de configuracion
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))
// establecer las configuraciones extra
app.engine('.hbs',engine({
    // establecer la master page
    defaultLayout:'main',
    // establecer el path de la carpeta layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    // establecer el path fr la carpeta partials
    partialsDir: path.join(app.get('views'),'partials'),
    // establecer 
    extname:'.hbs'
}))
app.set('view engine','.hbs')

// Middlewares 
// El servidor va a trabajar con informacion en base a formularios
app.use(express.urlencoded({extended:false}))


// // Variables globales

// Rutas 
// app.get('/',(req,res)=>{
//     res.send("Server on")
// })
app.get('/',(req,res)=>{
    res.render('index')
})

// Archivos estáticos
// Definir archivos estaticos y publicos
app.use(express.static(path.join(__dirname,'public')))

// exportar la variable app 
module.exports = app