const Portfolio = require('../models/Portafolio')

const renderIndex = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render('index',{portfolios})
}
// exportacion de la funcion
module.exports ={
    renderIndex
}