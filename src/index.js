// importar la variabla app
require('dotenv').config()

const app = require('./server.js')
const connection = require('./database.js')

connection()

// ejecutar el servidor en el puerto 3000
// app.listen(3000,()=>{
//     console.log(`Server on port ${3000}`);
// })

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})