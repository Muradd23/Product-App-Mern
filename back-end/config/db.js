// mongoose es una biblioteca de Node.js
// que facilita la interacción con MongoDB desde tus aplicaciones.


import mongoose from "mongoose";


export const connectDB = async ()=>{
    try{
        // await: Espera a que la promesa devuelta por mongoose.connect se resuelva. 
        // Esto evita que el código continúe ejecutándose hasta que la conexión se haya completado.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // mongoose.connect(process.env.MONGO_URI): Llama a la función connect de mongoose pasando
        // la URI de MongoDB almacenada en las variables de entorno.
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        //connect.connection.host:detalles de la conexion
    }
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1) // codigo 1 significa que termino con errores, codigo 0 con exito 
    }
       
}