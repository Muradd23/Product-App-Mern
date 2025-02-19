import { useState } from "react"
import { Container, VStack, Heading, Box, useColorModeValue, Input, Button,useToast } from "@chakra-ui/react"
import { useProductStore } from "../store/product"
const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    })

const { createProduct } = useProductStore();
const toast = useToast()
const handleAddProduct = async () => {
   
  const {success} = await createProduct(newProduct);
  if(!success){
    toast({
      title:'Error',
      description: "Error Creating Product.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }else{
    toast({
      title:'Product Created Successfully!.',
      description: "We've created your product for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })         
  }
  setNewProduct({name:"",price:"",image:""})
}


  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
      {/* Heading is used to render semantic HTML heading elements. */}
        <Heading as={"h1"}  size={"2xl"} textAlign={"center"} mb={2} padding={2} borderRadius={8} bgGradient='linear(to-l,rgb(25, 214, 232),rgb(25, 0, 255))' bgClip='text'>
          Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue('gray.300','gray.700')} p={6} rounded={"lg"} shadow={"dark-lg"}>
          
          <VStack spacing={4}>
            <Input placeholder="Product Name" name="name" value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}/>
            <Input placeholder=" Price" name="price" value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}/>
            <Input placeholder="Image URL" name="image" value={newProduct.image} onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})}/>
            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>Add Product</Button>
          </VStack>



        </Box>


      </VStack>
    
    
    </Container>
  )
}

export default CreatePage