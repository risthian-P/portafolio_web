// importat el modelo
const Portfolio = require('../models/Portafolio')

const renderAllPortafolios = async(req,res)=>{
    // listar todos los portafolios y transformar en objetos
    const portfolios = await Portfolio.find().lean()
    // mandar a la vista los portafolios
    res.render("portafolio/allPortfolios",{portfolios}) // la variable se encuentra tambien en allPortfolios.hbs
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
const createNewPortafolio =async(req,res)=>{
    console.log(req.body);
    // desestructurar los datos del req.body
    const {title, category,description} = req.body
    // crear nueva instancia
    const newPortfolio = new Portfolio({title,category,description})
    // guardar en la db
    await newPortfolio.save()
    // mostrar el resultado
    res.json({newPortfolio})
}
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}
const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
}



module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}