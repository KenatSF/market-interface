
import { Box, Stack, Text, Center } from "@chakra-ui/react";

import { useState, useCallback, useEffect } from "react";
import useKronos from "../../src/hooks/useKronos";

import { useWeb3React } from "@web3-react/core";

export default function KronosBalance() {
    const { account } = useWeb3React();
    const [balance, setBalance] = useState(0);
    const kronos = useKronos();

    const getBalance = useCallback(async () => {
        if (kronos) {
            const krnBalance = await kronos.methods.balanceOf(account).call();
            setBalance(krnBalance);
        }
    }, [kronos, account]);

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return (
        <Box>
            <Stack spacing={3}>
                <Center h='100px'>
                    <Text fontSize="4xl" verticalAlign="center">Your Kronos balance: {balance/1e18} KRN</Text>
                </Center>
            </Stack>
        </Box >
    )
}