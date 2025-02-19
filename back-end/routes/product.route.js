import express from 'express'
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/product.controller.js'
const router = express.Router()

//Aca se llama a cada controlador

//endpoint para crear producto
router.post("/",createProduct)

//endpoint para eliminar producto by id
router.delete('/:id',deleteProductById)

//endpoint para traer todos los productos
router.get('/',getAllProducts)

//endpoint para traer producto especifico by id
router.get('/:id',getProductById)

//endpoint para actualizar un producto by id
//put para actualizar todos los campos 
//patch para actualizar algunos campos
router.put('/:id',updateProductById)




export default router