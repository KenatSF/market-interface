import { useWeb3React } from "@web3-react/core";
import { Text, Center, Button, useToast } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";

import KronosTokenAddress from "../components/kronosTokenAddress";
import useMarketPlace from "../src/hooks/useMarketPlace";

import { useRouter  } from 'next/router'

export default function Kronos() {
    const [ isClaimed, setIsClaimed] = useState(false);
    const { active, account } = useWeb3React(); // Hacerla sensible al cambio de cuentas con useEffect
    const [freeTokensAmount, setfreeTokensAmount] = useState();
    const toast = useToast();
    const router = useRouter();

    const marketPlace = useMarketPlace();

    const getDataFromContract = useCallback(async () => {
        if (marketPlace) {
            const result = await marketPlace.methods.getFreeTokensAmount().call();
            setfreeTokensAmount(result);
        }
    }, [marketPlace]);

    useEffect(() => {
        getDataFromContract();
    }, [getDataFromContract]);

    const claim = () => {
        setIsClaimed(true);
        marketPlace.methods.claimFreeKronos().send({
            from: account
        })
        .on("transactionHash", (txHash) => {
            toast({
                title: 'Transaction send',
                description: txHash,
                status:'info'
            })
        }).on("receipt", () => {
            setIsClaimed(false);
            toast({
                title: 'Transaction confirmed',
                description: '',
                status: 'success'
            }) 
            router.push('ROUTE').then(() => window.location.reload())
        }).on("error", (error) => {
            setIsClaimed(false);
            toast({
                title: 'Transaction failed',
                description: error.message,
                status: 'error'

            })
        })
        
    };

    if (!active) return <KronosTokenAddress></KronosTokenAddress>;

    if (!((freeTokensAmount/1e18) > 0)) return <KronosTokenAddress></KronosTokenAddress>;

    return (
        <>
            <KronosTokenAddress>
                <Center h='100px'>
                    <Button
                        size='md'
                        height='48px'
                        width='200px'
                        border='2px'
                        borderColor='blue.500'
                        onClick={claim}
                        isLoading={isClaimed}
                    >
                        Claim 10,000 KRN tokens
                    </Button>
                </Center>
                <Center h='100px'>
                    <Text>You can claim just once!, KRN remained: {freeTokensAmount/1e18}</Text>
                </Center>
            </KronosTokenAddress>
        </>
    )
}