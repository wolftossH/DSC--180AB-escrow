import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract(
        ''
    );
    const { mutateAsync: createProduct } = useContractWrite(contract, 'createProduct');
  
    const address = useAddress();
    const connect = useMetamask();

    const publishProduct = async (form) => {
        try {
          const data = await createProduct([
            address, // owner
            form.name, // title
            form.description, // description
            form.price,
            form.amt,
            form.deposit,
          ])
    
          console.log("contract call success", data)
        } catch (error) {
          console.log("contract call failure", error)
        }
      }
  const getProducts = async () => {
    const products = await contract.call('getAllProducts');

    const parsedProducts = products.map((product, i) => ({
      seller: product.seller,
      name: product.name,
      description: product.description,
      price: ethers.utils.formatEther(product.target.toString()),
      amount: product.amt.toNumber(),
      pId: i
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
