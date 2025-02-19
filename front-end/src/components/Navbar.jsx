import {Container, Flex,Text,Link,HStack,Button,useColorMode, } from "@chakra-ui/react"
import { FiPlusSquare } from "react-icons/fi";
import { IoSunnyOutline,IoMoonOutline } from "react-icons/io5";

const Navbar = () => {
    //useColorMode is a React hook that gives you access to the current color mode, and a function to toggle the color mode.
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    // Containers are used to constrain a content's width to the current breakpoint, while keeping it fluid.
    <Container maxW={"1440px"} px={6}>

        {/* Flex is Box with display set to flex and comes with helpful style shorthand. It renders a `div` element. */}
        {/* Para tamaños de pantalla base (pequeños) se establece como columna (column), y para tamaños de pantalla pequeños en adelante (sm), se establece como fila (row). 
        Esto significa que el contenido será apilado verticalmente en pantallas pequeñas y horizontalmente en pantallas más grandes. */}
        <Flex height={16} align={"center"} justifyContent={"space-between"} flexDir={{base:"column",sm:"row"}}>

        {/* Text is the used to render text and paragraphs within an interface. */}
        {/* Esencialmente, permite que el fondo del texto (generalmente un gradiente de color o una imagen) se muestre a través del propio texto, mientras que el resto del fondo permanece transparente. */}
            <Text bgGradient='linear(to-l,rgb(25, 214, 232),rgb(25, 0, 255))' bgClip='text' fontSize={{base:"22",sm:"28"}}  fontWeight='bold' textTransform={"uppercase"} textAlign={"center"}>

            {/* Link is an accessible element for navigation. */}
                <Link href="/">Product Store 🛒</Link>

            </Text>

            {/* VStack: used to stack elements in the vertical direction
            HStack: used to stack elements in the horizontal direction
            Stack: used to stack elements in the vertical or horizontal direction */}
            <HStack spacing={2} alignItems={"center"}>

                <Link href="/create">
                    <Button>
                        {/* es un icono */}
                        <FiPlusSquare fontSize={20} />
                    </Button>
                </Link>
                
                <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoonOutline size={20}/>:<IoSunnyOutline size={20}/>}</Button>

            </HStack>

        </Flex>
    </Container>
  )
}

export default Navbar