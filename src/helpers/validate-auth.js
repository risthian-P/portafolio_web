// metodo para proteger rutas y a la vez esta siendo exportada
module.exports.isAuthenticated = (req,res,next)=>{
    // si existe un inicio de sesion
    if(req.isAuthenticated()){
        // continuar
        return next()
    }
    // redireccionamiento
    res.redirect('/user/login')
}
// metodo para proteger rutas y a la vez esta siendo exportada de sesion iniciada
// “Si el usuario ya está autenticado, redirige a otra página”, caso contrario se presenta la página del login
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}