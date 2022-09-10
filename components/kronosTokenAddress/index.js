
import {
    Box,
    Flex,
    useColorModeValue,
    Stack,
    Text,
    Center,
    useClipboard,
    Input,
    Button
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

export default function KronosTokenAddress({ children }) {
    const { chainId } = useWeb3React();
    const [value, setValue] = useState('0x51B49afF5d05e36eD50a38D0c3bA575B6F88dDF7')
    const { hasCopied, onCopy } = useClipboard(value)

    return (
        <Flex minH="100vh" direction="column">
            <Box
                mx="auto"
                maxW={"7xl"}
                width="100%"
                bg={useColorModeValue("white", "gray.800")}
                px={4}
            >
                <Stack spacing={3}>
                    <Center h='100px'>
                        <Text fontSize="5xl">Get some Kronos (KRN) tokens</Text>
                    </Center>
                </Stack>
                <Box
                    bg={useColorModeValue("white", "gray.800")}
                    px={4}>
                    <Text fontSize={26}> Swap some MATIC for KRN in Quickswap.</Text>
                    <Flex mb={2}>
                        <Text>Token address:</Text>
                        <Input value={value} isReadOnly />
                        <Button onClick={onCopy} ml={2}>
                            {hasCopied ? 'Copied' : 'Copy'}
                        </Button>
                    </Flex>
                </Box>
            </Box>
            <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
                {children}
            </Box>
        </Flex>
    )
}