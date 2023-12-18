const User = require('../models/User')
const passport = require("passport")


// mostrar el formulario de registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
// capturar los datos del formulario y almacenar en DB
const registerNewUser = async(req,res)=>{
    // capturar los datos del body
    const{name,email,password,confirmpassword} = req.body
    // validar todos los campors
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    // validar el password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    // validar si el usuario ya está registrado
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    // crear una nueva instancia del usuario
    const newUser = await new User({name,email,password,confirmpassword})
    // enciptar el password
    newUser.password = await newUser.encrypPassword(password)
    // guardar en DB
    newUser.save()
    // redireccinamiento
    res.redirect('/user/login')
}

// mostrar el formulario de login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
// capturar los datos del formulario y realizar el proceso de login conjunto con DB
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

// cerrar sesion del usuario
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}
// exportar los metodos
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}