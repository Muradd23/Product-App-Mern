import mongoose from 'mongoose'
// Este esquema define la estructura de los documentos de productos en la base de datos MongoDB.
const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true //si el campo es obligatorio true , si no false
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
}, {
    timestamps:true,//agrega dos campos a los documentos
    //createdAt: Este campo registra la fecha y la hora en que el documento fue creado.
    //updatedAt: Este campo registra la fecha y la hora de la última vez que el documento fue actualizado.
})


//modelo para interactuar con la base de datos.
const Product = mongoose.model('Product',productSchema)

export default Product