// importaciones
const express = require('express')
const path = require('path');
const { engine }  = require('express-handlebars')
const methodOverride = require('method-override');
const passport = require('passport');
// descargar "npm i express-session"
const session = require('express-session');
// descargar "npm i express-fileupload""
const fileUpload = require('express-fileupload')




// inicializar
// instanciar express
const app = express()
require('./config/passport')

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
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Middlewares 
// El servidor va a trabajar con informacion en base a formularios
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
// configurara la sesion del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
// inicializar passportjs y session
app.use(passport.initialize())
app.use(passport.session())


// // Variables globales
// crear una variable global
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})
// // Rutas 

app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))

// Archivos estáticos
// Definir archivos estaticos y publicos
app.use(express.static(path.join(__dirname,'public')))

// exportar la variable app 
module.exports = app