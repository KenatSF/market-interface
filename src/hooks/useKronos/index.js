import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import kronosArtifact from '../../config/web3/artifacts/kronos';


const { address, abi } = kronosArtifact;

const useKronos= () => {
    const { active, library, chainId } = useWeb3React();


    const kronos = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address[chainId]);
    },
    [active, chainId, library?.eth?.Contract]);

    return kronos;
};


export default useKronos;
