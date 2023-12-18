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
// const createNewPortafolio =async(req,res)=>{
//     console.log(req.body);
//     // desestructurar los datos del req.body
//     const {title, category,description} = req.body
//     // crear nueva instancia
//     const newPortfolio = new Portfolio({title,category,description})
//     // guardar en la db
//     await newPortfolio.save()
//     // mostrar el resultado
//     res.json({newPortfolio})
// }

const createNewPortafolio =async (req,res)=>{
    // desestructurar los datos del req.body
    const {title, category,description} = req.body
    // crear nueva instancia
    const newPortfolio = new Portfolio({title,category,description})
    // guardar en la db
    await newPortfolio.save()
    // mostrar el resultado
    res.redirect('/portafolios')
}

// metodo editar y actualizar el formulario
const renderEditPortafolioForm =async(req,res)=>{
    // consulta del portafolio en la base de datos
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // mandar a la vista
    res.render('portafolio/editPortfolio',{portfolio})
}

// metodo actualizar en la DB lo capturado en el form
const updatePortafolio = async(req,res)=>{
    // capturar los datos del body
    const {title,category,description}= req.body
    // actualizar el portafolio en DB 
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    // redireccionar
    res.redirect('/portafolios')
}

// metodo eliminar de la db
const deletePortafolio = async(req,res)=>{
    // captuarar el id del portafolio
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
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