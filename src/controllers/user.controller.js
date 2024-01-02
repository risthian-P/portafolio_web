const User = require('../models/User')
const passport = require("passport")
const { sendMailToUser } = require("../config/nodemailer")

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
    // establecer el token
    const token = newUser.crearToken()
    // enviar el correo electrónico
    sendMailToUser(email,token)
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

// confirmar el email
const confirmEmail = async(req,res)=>{
    // validar si existe el token
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    // obtener el usuario en base al token
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.send('Token confirmado, ya puedes iniciar sesión');
}

// exportar los metodos
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    confirmEmail,
    loginUser,
    logoutUser
}