import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useContractRead  } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// added {} in createContext to fix problem
const StateContext = createContext({});

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract(
        '0x8777a29Dd7bc252d75497FF6bE478d694100F7e9'
    );
    // const { mutateAsync: createProduct } = useContractWrite(contract, 'createProduct');
  
    const address = useAddress();
    const connect = useMetamask();

    // Get project deep
    const getProductsDeep = async () => {
      const { data, isLoading } = useContractRead(contract, "productsDeep")
      console.log(data)
    }

    /* Finished createProduct */
    const publishProduct = async (form) => {
      const data = await contract.call(
        'createProduct',
        address, // owner 
        form.name, // title
        form.description, // description
        form.price,
        form.amt,
        { value: ethers.utils.parseUnits(form.price.toString(), "wei")});  
      return data;
    }

    /* Finished getAllProducts */
  const getProducts = async () => {
    const products = await contract.call('getAllProducts');

    const parsedProducts = products.map((product, i) => ({
      seller: product.seller,
      name: product.name,
      description: product.description,
      price: ethers.utils.formatEther(product.price.toString()),
      amt: product.amt.toNumber(),
      init_amt: product.init_amt.toNumber(),
      cancelled: product.cancelled,
      rating: product.rating.toNumber(),
      pId: i,
    }));
    return parsedProducts;
  }

  const getUserProducts= async (product) => {
    const allProducts = await getProducts();
    const filteredCampaigns = allProducts.filter((product) => product.seller === address);
    console.log(allProducts)
    console.log(filteredCampaigns)
    return filteredCampaigns;
  }

  const getUserTransactions = async (product, buyer_id) => {
    const allProducts = await getProducts();
    const parsedProducts = allProducts.map((product, i) => ({
      seller: product.seller,
      name: product.name,
      description: product.description,
      price: ethers.utils.formatEther(product.price.toString()),
      amt: product.amt.toNumber(),
      init_amt: product.init_amt.toNumber(),
      cancelled: product.cancelled,
      rating: product.rating.toNumber(),
      pId: i,
    }));
    
    // const status = await getStatus(, buyer_id)
    // const filteredCampaigns = allProducts.filter((product) => product.seller === address);
    // console.log(filteredCampaigns)
    // return filteredCampaigns;
  }


  const buyProduct = async (product_id, delivery_address, deposit) => {
    const data = await contract.call(
      'buyProduct',
      product_id,
      delivery_address,
      { value: ethers.utils.parseUnits(deposit.toString(), "wei")});
    return data;
  }

  // Ongoing
  const observeBuyers = async (product_id) => {
    const products = await contract.call('observeBuyers', product_id);
    const parsedBuyers = products.map((product, i) => ({
      seller: product.buyer_ids,
    }));
    return parsedBuyers;
  }


  // // Ongoing
  const approvePurchase = async (product_id, buyer_id) => {
    const data = await contract.call(
      'approvePurchase',
      product_id,
      buyer_id,
    );
    return data;
  }
  // // Ongoing
  const rejectPurchase = async (product_id, buyer_id) => {
    const data = await contract.call(
      'rejectPurchase',
      product_id,
      buyer_id,
    );
    return data;
  }
  // // Ongoing
  const approveReceipt = async (product_id) => {
    const data = await contract.call(
      'approveReceipt',
      product_id,
    );
    return data;
  }
  // // Ongoing
  const cancelBuy = async (product_id) => {
    const data = await contract.call(
      'cancelBuy',
      product_id,
    );
    return data;
  }

  // Finished with Retreive button
  const stopProduct = async (product_id) => {
    const data = await contract.call(
      'stopProduct',
      product_id,
    );

  }
    // Ongoing
    const getDeliveryAddress = async (product_id, buyer_id) => {
      const data = await contract.call(
        'getDeliveryAddress',
        product_id,
        buyer_id,
      );
    }
  // Ongoing
  const getStatus = async (product_id, buyer_id) => {
    const data = await contract.call(
      'getStatus',
      product_id,
      buyer_id,
    );
  }
  
  // Ongoing
  const addRating = async (product_id, rating, review) => {
    const data = await contract.call(
      'addRating',
      product_id,
      rating,
      review,
    );
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createProduct: publishProduct,
        getProducts,
        getUserProducts,
        buyProduct,
        observeBuyers,
        stopProduct: stopProduct,
        addRating: addRating,
        getProductsDeep,
        getStatus,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext);
