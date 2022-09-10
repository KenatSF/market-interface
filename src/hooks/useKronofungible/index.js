import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import kronofungibleArtifact from '../../config/web3/artifacts/kronofungible';


const { address, abi } = kronofungibleArtifact;

const useKronofungible = () => {
    const { active, library, chainId } = useWeb3React();


    const kronofungible = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address[chainId]);
    },
    [active, chainId, library?.eth?.Contract]);

    return kronofungible;
};


export default useKronofungible;

