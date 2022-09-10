import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Stack, Center, Text, Grid, Box } from "@chakra-ui/react";

import { useWeb3React } from "@web3-react/core";
import Welcome from '../components/welcome';
import Loading from '../components/loading';
import { useNFTsData } from '../src/hooks/useNFTData';
import NftImage from '../components/nftImage';
import KronosBalance from '../components/kronosBalance';

export default function Home() {

  const { active, account } = useWeb3React(); // Hacerla sensible al cambio de cuentas con useEffect
  const { nfts, loading } = useNFTsData();

  if (!active) return <Welcome></Welcome>;         // Check out not connected

  return (
    <>
      {
        loading ?
          <Loading></Loading> :
          <Box>
            <KronosBalance></KronosBalance>
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
              {nfts.map(({ id, name, description, image, sold }) => (
                <NftImage key={id} tokenId={id} name={name} description={description} image={image} sold={sold} />
              ))}
            </Grid>
          </Box>
      }
    </>
  );
}
