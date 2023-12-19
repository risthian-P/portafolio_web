// importat el modelo
const Portfolio = require('../models/Portafolio')
const { uploadImage } = require('../config/cloudinary')

const renderAllPortafolios = async(req,res)=>{
    // listar todos los portafolios y transformar en objetos
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    // mandar a la vista los portafolios
    res.render("portafolio/allPortfolios",{portfolios}) // la variable se encuentra tambien en allPortfolios.hbs
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}


const createNewPortafolio =async (req,res)=>{
    // desestructurar los datos del req.body
    const {title, category,description} = req.body
    // crear nueva instancia
    const newPortfolio = new Portfolio({title,category,description})
    newPortfolio.user = req.user._id
    // validar si existe una imagen
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    // utilizar el metodo
    // const imageDemo = "photo.png" || req.files.image.tempFilePath //esto es para mandar una por defoult sin validar
    await uploadImage(req.files.image.tempFilePath)
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
    const portfolio = await Portfolio.findById(req.params.id).lean()
    if(!(portfolio.user.toString() !== req.user._id.toString())) return res.redirect('/portafolios')
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