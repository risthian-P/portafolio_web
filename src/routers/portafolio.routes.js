// importar router de express
const{Router} = require('express')

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
router.get('/portafolio/add', renderPortafolioForm)
router.post('/portafolio/add', createNewPortafolio)
// read
router.get('/portafolios', renderAllPortafolios)
router.get('/portafolio/:id', renderPortafolio)
// update
router.get('/portafolio/edit/:id', renderEditPortafolioForm)
router.put('/portafolio/edit/:id', updatePortafolio)
// delete
router.delete('/portafolio/delete/:id', deletePortafolio)

module.exports = router