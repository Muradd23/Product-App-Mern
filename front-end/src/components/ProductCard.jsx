import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box,Button,FormLabel,Heading,HStack,IconButton,Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import { useProductStore } from "../store/product"
import { useState } from "react"



const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200")
    const bgColor =useColorModeValue("gray.200","gray.800")
    console.log(product)

    const {deleteProducts} = useProductStore()
    const toast = useToast()

    const [updatedProduct, setUpdatedProduct] = useState(product)



    const {isOpen, onOpen, onClose} = useDisclosure()




    const handleDelete = async (id) =>{
        const {success,msg} = await deleteProducts(id)
        if(!success){
            toast({
                title:'Error Delete',
                description: msg,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }else{
            toast({
              title:'Product Deleted Successfully!.',
              description: msg,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })         
            
          }
    }

const {updateProduct} = useProductStore()
const handleUpdateProduct = async (id, updatedProduct)=>{
  const {success, msg} = await updateProduct(id, updatedProduct)
  
  if(!success){
    toast({ 
        title:'Error Updating',
        description: msg,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
  }else{
      toast({
        title:'Product Updated Successfully!.',
        description: msg,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })         
    }
    onClose();
}

return (
    <Box shadow={'lg'} bgColor={bgColor}  rounded={'lg'} overflow={'hidden'} transition={'all 0.3s'} _hover={{transform:'translateY(-8px)',shadow:'dark-lg'} } >
        <Image src= {product.image} alt={product.name} h={48} w={"full"} objectFit={'cover'}/>

        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={'2'} color={textColor}>
                {product.name}
            </Heading>

            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue"></IconButton>
                <IconButton icon={<DeleteIcon />} onClick={()=>handleDelete(product._id)} colorScheme="red"></IconButton>
            </HStack>

        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>

            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <FormLabel>Product Name</FormLabel>
                <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={(e)=>setUpdatedProduct({...updatedProduct,name:e.target.value})}/>
                <FormLabel>Price</FormLabel>
                <Input placeholder="Price" name="price" type='number' value={updatedProduct.price} onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})}/>
                <FormLabel>Image URL</FormLabel>
                <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})}/>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>Save</Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>

        </Modal>

    </Box>

  )
}
export default ProductCard
