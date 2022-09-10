import { useCallback, useEffect, useState } from "react";
import useMarketPlace from "../useMarketPlace";
import useKronofungible from "../useKronofungible";

import { usersApi } from "../useIPFS";


const getFullData = async ({marketplace, kronofungible, tokenId}) => {
    const marketData = await marketplace.methods.fetchMarketItem(tokenId).call();
    const url = await kronofungible.methods.uri(tokenId).call();

    const result = await usersApi.get(url);

    const id = tokenId;
    const name = result.data.name;
    const description = result.data.description;
    const image = result.data.image;
    const sold = marketData.sold;

    return { id, name, description, image, sold };
};


const useNFTsData = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const marketplace = useMarketPlace();
    const kronofungible = useKronofungible();

    const update = useCallback( async () => {
        if(marketplace && kronofungible) {
            setLoading(true);

            let tokenItems

            const currentindex = await marketplace.methods.getCurrentMarketItems().call();
            tokenItems = new Array(Number(currentindex) + 1).fill().map((_, index) => index);



            const dataPromise = tokenItems.map((tokenId) => 
                getFullData({marketplace, kronofungible, tokenId})
            );


            const answers = await Promise.all(dataPromise);

            setNfts(answers);
            setLoading(false);
        }
    }, [marketplace, kronofungible]);

    useEffect(() => {
        update();
    }, [update]);


    return {nfts, loading, update};
};



export { useNFTsData };