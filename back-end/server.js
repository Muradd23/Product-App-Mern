//Dentro del package.json
// 1-)Al especificar "type": "module", 
// estás diciendo que quieres usar las instrucciones 
// import y export que son propias de los módulos ES6 en lugar 
// de los módulos CommonJS que utilizan require y module.exports.
//2-)scrip{"dev":"nodemon backend/server.js"}
// Esto le dice a npm que ejecute el comando asociado al script "dev", que en este caso ejecutará tu servidor de desarrollo.
// Este método es útil para evitar tener que escribir comandos largos cada vez que quieras iniciar tu servidor, 
// simplificando así el flujo de trabajo
//const express = require('express')

import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
console.log(process.env.MONGO_URI);
import express from 'express'

//Este comando lee las variables de entorno definidas en el archivo .env
//  y las agrega a process.env

import {connectDB} from './config/db.js' 
import productRoutes from './routes/product.route.js';



const app = express()

const PORT = process.env.PORT || 5000;
//permite acceptar datos del json en el req.body
app.use(express.json())

const __dirname = path.resolve()

// todas las rutas van tener el prefijo de "/api/products"
//Al llamar a productRoute, se llama a la funcion router que esta dentro de product.route.js
app.use('/api/products',productRoutes)

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"/front-end/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"front-end","dist","index.html"))
    })
}


app.listen(PORT,()=>{
    connectDB()
    console.log('server listen port ' + PORT);
    
})


//TfSwSDArTw8QCGWA
//miguelriosdc

//mongodb+srv://miguelriosdc:<db_password>@cluster0.7umlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0