import { Center, Spinner, Button, useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import marketPlaceArtifact from "../../src/config/web3/artifacts/marketplace";
import useKronos from "../../src/hooks/useKronos";
import useMarketPlace from "../../src/hooks/useMarketPlace";
import { useRouter  } from 'next/router'


const { address } = marketPlaceArtifact;

const NftButton = ({ tokenId, sold }) => {
    const { account, chainId, library } = useWeb3React();
    const [isClaimed, setIsClaimed] = useState(false);
    const [isSold, setIsSold] = useState(sold);
    const [isApproved, setIsApproved] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const kronos = useKronos();
    const marketplace = useMarketPlace();

    const getApprovedBalance = useCallback(async () => {
        if (kronos) {
            setIsApproved(false);
            const answer = await kronos.methods.allowance(account, address[chainId]).call();
            if ((answer / 1e18) >= 10000) setIsApproved(true);
        }
    }, [kronos, account, chainId]);

    useEffect(() => {
        getApprovedBalance();
    }, [getApprovedBalance]);

    const approve = () => {
        setIsClaimed(true);
        kronos.methods.approve(address[chainId], library.utils.toWei('10000', 'ether')).send({
            from: account
        })
            .on("transactionHash", (txHash) => {
                toast({
                    title: 'Transaction send',
                    description: txHash,
                    status: 'info'
                })
            }).on("receipt", () => {
                setIsClaimed(false);
                toast({
                    title: 'Transaction confirmed',
                    description: '',
                    status: 'success'
                })
                setIsApproved(true)
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

    const buy = () => {
        setIsClaimed(true);
        marketplace.methods.buyItem(tokenId).send({
            from: account
        })
            .on("transactionHash", (txHash) => {
                toast({
                    title: 'Transaction send',
                    description: txHash,
                    status: 'info'
                })
            }).on("receipt", () => {
                setIsClaimed(false);
                toast({
                    title: 'Transaction confirmed',
                    description: '',
                    status: 'success'
                })
                setIsSold(true);
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


    return (
        <>
            {isSold ?
                <Button
                    size='md'
                    height='48px'
                    width='200px'
                    border='2px'
                    borderColor='blue.500'
                >
                    SOLD
                </Button>
                : <>
                    {isApproved ?
                        <Button
                            size='md'
                            height='48px'
                            width='200px'
                            border='2px'
                            borderColor='blue.500'
                            onClick={buy}
                            isLoading={isClaimed}
                        >
                            Buy
                        </Button>
                        :
                        <Button
                            size='md'
                            height='48px'
                            width='200px'
                            border='2px'
                            borderColor='blue.500'
                            onClick={approve}
                            isLoading={isClaimed}
                        >
                            Approve Balance
                        </Button>
                    }</>}

        </>
    );
};

export default NftButton;