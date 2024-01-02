// importar router de express
const {Router} = require('express')
// desestructurar
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser,confirmEmail} = require('../controllers/user.controller')
const { redirectIfAuthenticated } = require('../helpers/validate-auth')
// instanciar la variable router
const router = Router()

// ruta para mostrar el formulario de registro
router.get('/user/register',renderRegisterForm)
// ruta para capturar los datos del formulario y almacenar en DB
router.post('/user/register',registerNewUser)

// ruta para mostrar el formulario de login
router.get('/user/login',redirectIfAuthenticated,renderLoginForm)
// ruta para capturar los datos del formulario y realizar el proceso de login conjunto con DB
router.post('/user/login',loginUser)

// ruta para cerrar sesion del usuario
router.post('/user/logout',logoutUser)

// ruta para confirmar la cuenta del usuario
router.get('/user/confirmar/:token',confirmEmail)

module.exports =router