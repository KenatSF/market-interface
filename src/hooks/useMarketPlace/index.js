import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import marketPlaceArtifact from '../../config/web3/artifacts/marketplace';


const { address, abi } = marketPlaceArtifact;

const useMarketPlace = () => {
    const { active, library, chainId } = useWeb3React();


    const marketPlace = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address[chainId]);
    },
    [active, chainId, library?.eth?.Contract]);

    return marketPlace;
};


export default useMarketPlace;

