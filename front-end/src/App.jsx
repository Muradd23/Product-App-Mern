import { Box, useColorModeValue } from "@chakra-ui/react"
import { Routes,Route } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
function App() {
  

  return (
    //100vh= 100% viewport Height
    //Box By default, it renders a `div` element
    <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
      <Navbar/>
      {/*Routes:It allows your application to switch between different components (or pages) without reloading the entire page. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />  
      </Routes>
    </Box>
  );
}

export default App
