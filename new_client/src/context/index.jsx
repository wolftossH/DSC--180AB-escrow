import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
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

    // const publishProduct = async (form) => {
    //     try {
    //       const data = await createProduct([
    //         address, // owner 
    //         form.name, // title
    //         form.description, // description
    //         form.price,
    //         form.amt,
    //         form.deposit,
    //       ])
    
    //       console.log("contract call success", data)
    //     } catch (error) {
    //       console.log("contract call failure", error)
    //     }
    //   }
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
  const getProducts = async (form) => {
    const products = await contract.call('getAllProducts');

    const parsedProducts = products.map((product, i) => ({
      seller: product.seller,
      name: product.name,
      description: product.description,
      price: ethers.utils.formatEther(product.price.toString()),
      amount: product.amt.toNumber(),
      pId: i,
      pic: form.image,
    }));

    return parsedProducts;
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createProduct: publishProduct,
        getProducts,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext);
