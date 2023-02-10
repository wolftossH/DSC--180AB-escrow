import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    // const { contract } = useContract(
    //     '0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9'
    // );
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
}

export const useStateContext = () => useContext(StateContext);