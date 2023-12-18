// importar router de express
const{Router} = require('express')
const {isAuthenticated} = require('../helpers/validate-auth')

const router = Router()

// esta importacion viene de las rutas de avajo de forma automatica al ser nombrada
const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controller.js')
// create
router.get('/portafolio/add',isAuthenticated, renderPortafolioForm)
router.post('/portafolio/add',isAuthenticated, createNewPortafolio)
// read
router.get('/portafolios',isAuthenticated, renderAllPortafolios)
router.get('/portafolio/:id',isAuthenticated, renderPortafolio)
// update
router.get('/portafolio/edit/:id',isAuthenticated, renderEditPortafolioForm)
router.put('/portafolio/edit/:id',isAuthenticated, updatePortafolio)
// delete
router.delete('/portafolio/delete/:id',isAuthenticated, deletePortafolio)

module.exports = router