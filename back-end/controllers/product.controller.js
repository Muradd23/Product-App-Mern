import mongoose from "mongoose"
import Product from "../models/product.model.js"
//funcion para crear producto
export const createProduct = async (req,res)=>{
    const product = req.body // el usuario va a mandar estos datos
    if(!product.name || !product.price || !product.image){
        res.status(400).json({success:false,msg:'Please provide all the fields'})
    }
    //crea una instancia del nuevo producto
    const newProduct = new Product(product)

    try {
        //await para esperar a que la promesa de guardar el producto en la base de datos se resuelva.
        await newProduct.save()
        res.status(201).json({success:true,data:newProduct})
    } catch (error) {
        console.log(`Error in Create Product: ${error.message}`)
        res.status(500).json({success:false,msg:'Server Error'})
    }

}
//funcion para eliminar producto by id
export const deleteProductById =  async (req,res)=>{
    const {id} = req.params
    console.log(id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,msg:'No product with that id'})
    }


    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,msg:"Product Deleted"})
    } catch (error) {
        res.status(500).json({success:false,msg:"Server error"})
    }
}

//funcion para traer todos los productos
export const getAllProducts = async (req,res)=>{
    try {
        //find({}) va a traer todos los datos que hay en la base de datos
        const products =  await Product.find({})
        res.status(200).json({success:true,data:products})
    } catch (error) {
        res.status(400).json({success:false,msg:"Products not found"})
    }
}

//funcion para traer producto especifico by id
export const getProductById = async (req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json({success:true,data:product})

    } catch (error) {
        res.status(400).json({success:false,msg:"Products not found"})
    }
}
//funcion para actualizar un producto by id
//put para actualizar todos los campos 
//patch para actualizar algunos campos
export const updateProductById = async(req,res)=>{
    const {id} = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,msg:'No product with that id'})
    }

    try {
        //si se pone sin el new:true te trae el objeto sin actualizar

        const updateProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,data:updateProduct})
    } catch (error) {
        res.status(500).json({success:false,msg:'Error in the server'})
    }
}