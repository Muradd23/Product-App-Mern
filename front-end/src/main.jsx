import {ChakraProvider} from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import App from './App.jsx'
//Wrapping  the app
{/* <StrictMode>: Helps you identify potential problems in your application by activating additional checks and warnings.
<BrowserRouter>: Manages the routing within your app, making it possible to navigate through different pages.
<ChakraProvider>: Provides Chakra UI's theme and context to your entire application, ensuring consistent design and styling. */}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
