// importar passport
const passport = require('passport')
// importar modelo user
const User = require('../models/User')
// establecer la estrategia
const LocalStrategy = require('passport-local').Strategy


// implementar la estrategia local
passport.use(new LocalStrategy({
    // en base a email y password
    usernameField:'email',
    passwordField:'password'
    // funcion para hacer el proceso de inicio de sesion
},async(email,password,done)=>{
    // Buscar el usuario en base al email
    const userBDD = await User.findOne({email})
    // verificar si existe el usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    // desencriptar el password
    const passwordUser = await userBDD.matchPassword(password)

    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    // retornar el usuario de la DB
    return done(null,userBDD)
}))


// Serializar el usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// Deserealizar el usuario
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});