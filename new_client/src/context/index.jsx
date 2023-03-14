import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useContractRead  } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Readt, {useState, useEffect} from 'react';
import axios from 'axios';
//import setGataway from '../pinata.js';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// added {} in createContext to fix problem
const StateContext = createContext({});

const setGateway = (metaURL) => {
  let out = metaURL.split('cloud')[1];
  let first = out.slice(0,6);
  if (first == '/ipfs/') {
      out = out.slice(6)
  }
  else {
    //console.log('the wrong shit: '+ out)
  }
  return "https://copper-electoral-bison-672.mypinata.cloud/ipfs/"+out
}

const getMeta = async (metaURL, item) => {
  metaURL = setGateway(metaURL);
  //console.log(metaURL)
  let meta = await axios.get(metaURL, {
    headers: {
      'Accept': 'text/plain'
    }
  });
  meta = meta.data;
  return meta[item]
}

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract(
        '0x9222918Ac5eAF19ab0a81C344e349df2C1782E78'
    );
    // old contracts
    // 0x9222918Ac5eAF19ab0a81C344e349df2C1782E78
    // 0x7a81D022CD5C8Fd3C818Cb3Ad09e2aD1bC4382Ac
    // 0xC2fC0e412464F3e15Cac0Cd82F7459b3cA89D144
    // const { mutateAsync: createProduct } = useContractWrite(contract, 'createProduct');
    const address = useAddress();    
    const connect = useMetamask();
    /* Finished createProduct */
    const publishProduct = async (form) => {
      const data = await contract.call(
        'createProduct',
        address, // owner 
        form.metadataURL, // title
        form.price,
        form.amt,
        { value: ethers.utils.parseUnits(form.price.toString(), "wei")});  
      return data;
    }

    /* Finished getAllProducts */

  const getProducts = async () => {
    const products = await contract.call('getAllProducts');
    const parsedProducts = products.map((product, i) => ({
      name: getMeta(product.metaURL, 'name'),
      description: getMeta(product.metaURL,'description'),
      img: getMeta(product.metaURL,'image'),
      seller: product.seller,
      product_id: product.product_id,
      metaURL: product.metaURL,
      price: ethers.utils.formatEther(product.price.toString()),
      amt: product.amt.toNumber(),
      init_amt: product.init_amt.toNumber(),
      cancelled: product.cancelled,
      rating: product.total_ratings.toNumber(),
      pId: i,
      reviews: product.reviews,
      ratings: product.ratings.map(x => x.toNumber()),
      avg_rating: (
        [product.ratings.map(x => x.toNumber()).reduce((partialSum, a) => partialSum + a, 0)
          /product.total_ratings.toNumber()].map(x => {
          if (isNaN(x))
            return undefined
          else
            return x
        }
      )[0]
      )
    }));
    //console.log('index image '+parsedProducts[1].img)
    return parsedProducts
  }

  const getModProducts = async (buyer_id) => {
    const products = await getProducts();
    const parsedProducts = await Promise.all(products.map(async (product,i) => {
     //console.log('index metaURL: ' + product.metaURL);
      let meta = await axios.get(setGateway(product.metaURL), {
        headers: {
          'Accept': 'text/plain'
        }
      });
      meta = meta.data;
      return {
        name: meta.name,
        description: meta.description,
        img: setGateway(meta.image),
        seller: product.seller,
        metaURL: product.metaURL,
        price:product.price,
        amt: product.amt,
        init_amt: product.init_amt,
        cancelled: product.cancelled,
        rating: product.rating,
        pId: i,
        status: await getStatus(i, buyer_id),
        reviews: product.reviews,
        ratings: product.ratings,
        avg_rating: product.avg_rating,        
      }
  }));
    //console.log('index getModPro: '+ parsedProducts[0].img)
    return parsedProducts;
  }


  const getUserProducts= async (product) => {
    const allProducts = await getModProducts(address);
    const filteredCampaigns = allProducts.filter((product) => product.seller === address);
    return filteredCampaigns;
  }

  const getUserTransactions = async (buyer_id) => {
    const allProducts = await getProducts();
    const parsedProducts = await Promise.all(allProducts.map(async (product,i) => {
      let meta = await axios.get(setGateway(product.metaURL), {
        headers: {
          'Accept': 'text/plain'
        }
      });
      meta = meta.data;
      return {
        name: meta.name,
        description: meta.description,
        img: setGateway(meta.image),
        seller: product.seller,
        metaURL: product.metaURL,
        product_id: product.product_id,
        price:product.price,
        amt: product.amt,
        init_amt: product.init_amt,
        cancelled: product.cancelled,
        rating: product.rating,
        pId: i,
        status: await getStatus(i, buyer_id),
        reviews: product.reviews,
        ratings: product.ratings,
        avg_rating: product.avg_rating,
      }
  }));
    const filteredCampaigns = parsedProducts.filter((product) => product.status > 0);
    return filteredCampaigns;
  }

  const { mutateAsync: buyP } = useContractWrite(contract, "buyProduct")
  const buyProduct = async (product_id, delivery_address, deposit) => {
    try {
      const data = await buyP([ product_id, delivery_address,
        { value: ethers.utils.parseUnits(deposit.toString(), "wei")} ]);
      return data
    } catch (err) {
    }
    // const data = await contract.call(
    //   'buyProduct',
    //   product_id,
    //   delivery_address,
    //   { value: ethers.utils.parseUnits(deposit.toString(), "wei")});
    // return data;
  }

  // Ongoing
  const observeBuyers = async (product_id) => {
    const products = await contract.call('observeBuyers', product_id);
    return products;
  }


  // // Ongoing
  const { mutateAsync: approveP} = useContractWrite(contract, "approvePurchase")
  const approvePurchase = async (product_id, buyer_id) => {
    try {
      const data = await approveP([ product_id, buyer_id ]);
      return data
    } catch (err) {

    }
    // const data = await contract.call(
    //   'approvePurchase',
    //   product_id,
    //   buyer_id,
    // );
    // return data;
  }
  // // Ongoing
  const { mutateAsync: rejectP } = useContractWrite(contract, "rejectPurchase")
  const rejectPurchase = async (product_id, buyer_id) => {
      try {
        const data = await rejectP([ product_id, buyer_id ]);
        return data;      
      } 
      catch (err) {
        // console.error("contract call failure", err);
      }
    // const data = await contract.call(
    //   'rejectPurchase',
    //   product_id,
    //   buyer_id,
    // );
    // return data;
  }

  // // Ongoing
  const { mutateAsync: confirmReceipt } = useContractWrite(contract, "approveReceipt")
  const approveReceipt = async (product_id) => {
    try {
      const data = await confirmReceipt([ product_id ]);
      return data;      
    } 
    catch (err) {

    }
    // const data = await contract.call(
    //   'approveReceipt',
    //   product_id,
    // );
    // console.log(data)
    // return data;
  }

  // // Ongoing
  const { mutateAsync: cancelB } = useContractWrite(contract, "cancelBuy")
  const cancelBuy = async (product_id) => {
    try {
      const data = await cancelB([ product_id ]);
      return data;      
    } 
    catch (err) {

    }
    // const data = await contract.call(
    //   'cancelBuy',
    //   product_id,
    // );
    // return data;
  }

  // Finished with Retreive button
  const { mutateAsync: stopP } = useContractWrite(contract, "stopProduct")
  const stopProduct = async (product_id) => {
    try {
      const data = await stopP([ product_id ]);
      return data
    } catch (err) {
    }
    // const data = await contract.call(
    //   'stopProduct',
    //   product_id,
    // );
  }
    // Ongoing
    const getDeliveryAddress = async (product_id, buyer_id) => {
      const data = await contract.call(
        'getDeliveryAddress',
        product_id,
        buyer_id,
      );
      return data
    }
  // Ongoing
  const getStatus = async (product_id, buyer_id) => {
    const data = await contract.call(
      'getStatus',
      product_id,
      buyer_id,
    );
    return data;
  }
  
  // Ongoing
  const { mutateAsync: addR } = useContractWrite(contract, "addRating")
  const addRating = async (product_id, rating, review) => {
    try {
      const data = await addR([ product_id, rating, review ]);
    } catch (err) {
    }
    // const data = await contract.call(
    //   'addRating',
    //   product_id,
    //   rating,
    //   review,
    // );
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createProduct: publishProduct,
        getProducts,
        getModProducts,
        getUserProducts,
        getUserTransactions,
        buyProduct,
        observeBuyers,
        stopProduct: stopProduct,

        approvePurchase,
        rejectPurchase,
        cancelBuy,
        approveReceipt,
        getStatus,

        getDeliveryAddress,
        addRating: addRating,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext);
