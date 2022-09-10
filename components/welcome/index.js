
import {
    Box,
    Flex,
    useColorModeValue,
    Stack,
    Text,
    Center,
    Image
} from "@chakra-ui/react";
import RequestAccess from "../request-access";

export default function Welcome() {

    return (
        <Flex minH="100vh" direction="column">
            <Box
                mx="auto"
                maxW={"7xl"}
                width="100%"
                bg={useColorModeValue("white", "gray.800")}
                px={4}
            >
                <RequestAccess></RequestAccess>
                <Stack spacing={3}>
                    <Center h='100px'>
                        <Text fontSize="5xl">NFTs</Text>
                    </Center>
                    <Center h='100px'>
                        <Image src="./nft.jpg" width="120px" />
                    </Center>
                    <Center h='100px'>
                        <Image src="./nft2.jpg" width="120px" />
                    </Center>
                    <Center h='100px'>
                        <Image src="./nft3.jpg" width="120px" />
                    </Center>
                    <Center h='100px'>
                        <Image src="./nft4.jpg" width="120px" />
                    </Center>
                    <Center h='100px'>
                        <Image src="./nft5.jpg" width="120px" />
                    </Center>
                </Stack>
            </Box>
        </Flex>
    )
}