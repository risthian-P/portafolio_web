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
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}