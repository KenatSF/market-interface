  import { Flex, Button, Tag, TagLabel, Badge, TagCloseButton, Text } from "@chakra-ui/react";
  import { AddIcon } from "@chakra-ui/icons";

  import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
  import { connector } from "../../../config/web3";
  import { useCallback, useEffect, useState } from "react";
  import useTruncatedAddress from "../../../hooks/useTruncatedAddress";
  
  const WalletData = () => {
    const [balance, setBalance] = useState(0);
    const { active, activate, deactivate, account, error, library } = useWeb3React();

  
    const isUnsupportedChain = error instanceof UnsupportedChainIdError;
  
    const connect = useCallback(() => {
      activate(connector);
      localStorage.setItem("previouslyConnected", "true");
    }, [activate]);
  
    const disconnect = () => {
      deactivate();
      localStorage.removeItem("previouslyConnected");
    };
  
    const getBalance = useCallback(async () => {
      const toSet = await library.eth.getBalance(account);
      setBalance((toSet / 1e18).toFixed(4));
    }, [library?.eth, account]);

  
    useEffect(() => {
      if (active) {
        getBalance();
      };
    }, [active, getBalance]);
  
    useEffect(() => {
      if (localStorage.getItem("previouslyConnected") === "true") connect();
    }, [connect]);
  
    const truncatedAddress = useTruncatedAddress(account);
  
    return (
      <Flex alignItems={"center"}>
        {active ? (
          
          <Tag colorScheme="blue" borderRadius="full">
            <TagLabel>
              <Text>{truncatedAddress}</Text>                    
            </TagLabel>
            <Badge
              d={{
                base: "none",
                md: "block",
              }}
              variant="solid"
              fontSize="0.9rem"
              ml={1}
            >
              ~{balance} MATIC  
            </Badge>
            <TagCloseButton onClick={disconnect} />
          </Tag>
        ) : (
          <Button
            variant={"solid"}
            colorScheme={"blue"}
            size={"sm"}
            leftIcon={<AddIcon />}
            onClick={connect}
            disabled={isUnsupportedChain}
          >
            {isUnsupportedChain ? "Chain not supported" : "Connect Wallet"}
          </Button>
        )}
      </Flex>
    );
  };
  
  export default WalletData;