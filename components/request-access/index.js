import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
  } from "@chakra-ui/react";
  
  const RequestAccess = () => {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Connect your wallet</AlertTitle>
        <AlertDescription>Metamask in Polygon</AlertDescription> 
      </Alert>
    );
  };
  
  export default RequestAccess;