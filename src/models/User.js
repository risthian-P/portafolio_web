// importar esquema y modelo
const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

// crear un esquema SCHEMA
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    },token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    // ESTABLECER LOS SALTOS PARA ENCRIPTAR EL PASSWORD
    const salt = await bcrypt.genSalt(10)
    // ENCRIPTAR EL PASSWORD
    const passwordEncryp = await bcrypt.hash(password,salt)
    // RETORNAR EL PASWOORD ENCRIPTADO
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    // UTILIZAR EL METODO COMPARE
    const response = await bcrypt.compare(password,this.password)
    // RETORNAR EL BOOLEANO
    return response
}

// Método para crear un token 
userSchema.methods.crearToken = function(){
return token = this.token = Math.random().toString(36).slice(2)
}

// exportar el modelo
module.exports = model('User',userSchema)