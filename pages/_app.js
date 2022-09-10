import '../styles/globals.css'

import { ChakraProvider } from "@chakra-ui/react"
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../src/config/web3";
import MainLayout from '../src/layouts/main';


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout> 
      </Web3ReactProvider>
    </ChakraProvider>
  )
}

export default MyApp
