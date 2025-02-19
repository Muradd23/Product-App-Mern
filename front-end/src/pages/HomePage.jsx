import { Container, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { useProductStore } from "../store/product"
import ProductCard from "../components/ProductCard"

const HomePage = () => {
  const {fetchProducts,products} = useProductStore()
  useEffect(()=>{
    fetchProducts()
  },[fetchProducts])
  console.log('products',products)
  return (
    <Container maxW='full' py={12}>
        <VStack spacing={12} >
          <Text bgGradient='linear(to-l,rgb(25, 214, 232),rgb(25, 0, 255))' bgClip='text' fontSize={{base:"18",sm:"24"}}  fontWeight='bold' textTransform={"uppercase"} textAlign={"center"}>
            Current Products
          </Text>

         

          {/*para que no sea reactivo "columns={3}" 
          para ser reactivo abrir obj*/}
          <SimpleGrid  columns={{base:1,md:2,lg:3}} spacing={6} w={"full"}>
              {products.map((product)=>(
                <ProductCard key={product._id} product={product}/> 
              ))}
          </SimpleGrid>
          {products.length === 0 &&(
             <Text fontSize={'xl'} textAlign={"center"}>
             No current Products. <Link href="/create" bgGradient='linear(to-l,rgb(25, 214, 232),rgb(25, 0, 255))' bgClip='text'> Create a Product.</Link>
           </Text>
          )}
        </VStack>
    </Container>

    
  )
}

export default HomePage