import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import useFetch from "../hooks/gifGen";

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const ProductDetailsSellers = () => {

  const { state } = useLocation();
  const keyword = state.name;
  const gifUrl = useFetch({ keyword });
  const {observeBuyers,  contract, address, stopProduct, rejectPurchase } = useStateContext();  
  const [isLoading, setIsLoading] = useState(false);
  const [buyers, setBuyers] = useState([]);

  const fetchBuyers = async () => {
    setIsLoading(true);
    console.log(address);
    console.log(state.seller)
    console.log(state.pId)
    // const data = await observeBuyers(state.pId);
    // setBuyers(data);
    setIsLoading(false);
    }
  
  useEffect(() => {
    if(contract) fetchBuyers();
  }, [contract, address])

  const handleStopProduct = async () => {
    setIsLoading(true);
    const data = await stopProduct(state.pId);
    setIsLoading(false);
  }

  const handleReject = async () => {
    setIsLoading(true);
    await rejectPurchase(
      state.pId,
      buyers,
    ); 
    setIsLoading(false);
  }


    return (
        <div>
        {isLoading && <Loader />}
  
        <div className="w-full flex md:flex-row flex-col mt-5 gap-[15px]">
          <div className="flex-1 flex-col">
            <img src={gifUrl} alt="product" className="w-11/12 h-[500px] object-cover rounded-xl"/>
            <div className="relative w-11/12  h-[5px] bg-[#3a3a43] mt-2">
              <div className="absolute h-full bg-[#4acd8d]" 
              style={{ width: `${calculateBarPercentage(state.init_amt, state.amt)}%`,
               maxWidth: '100%'}}>
              </div>
            </div>
          </div>
  
          <div className="flex md:w-[250px] w-full flex-wrap justify-between gap-[70px]">
            <CountBox title={`Price in ETH`} value={state.price} />
            <CountBox title={`Initial amount of ${state.init_amt}`} value={state.amt} />
            <CountBox title={`Out of 5 Stars`} value={state.rating} />
          </div>
        </div>
  
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Hello Seller
              </h4>
  
              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img src={gifUrl} alt="user" className="w-[60%] h-[60%] object-contain"/>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.seller}</h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]"> Products</p>
                </div>
              </div>
            </div>
  
            <div>
              <h4 className="font-epilogue font-semibold text-[25px] text-white uppercase">Description</h4>
  
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[20px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
                </div>
            </div>
  
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Current Buyers</h4>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Past Buyers</h4>
                {/* <div className="mt-[20px] flex flex-col gap-4">
                  {donators.length > 0 ? donators.map((item, index) => (
                    <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                      <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                    </div>
                  )) : (
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                  )}
                </div> */}
            </div>
            {state.amt != 0 && (
              <div className="mt-[10px] flex flex-col p-5 bg-[#1c1c24] rounded-[10px] ">
              <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Suspicious Buyer
              </p>
              {/* {state.amt != 0 && ( */}
                <div className="mt-[30px]">
                  <input 
                    type="text"
                    placeholder="Buyer to reject"
                    step="0.01"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={buyers}
                    onChange={(e) => setBuyers(e.target.value)}
                  />    
                  <CustomButton 
                    btnType="button"
                    title="Reject Buyer"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleReject}
                  />
                </div>             
    
                {/* )} */}
                {state.amt === 0 && (
                  <h1 className="font-epilogue font-semibold text-[20px] leading-[22px] text-white">Products ran out</h1>
                )}
            </div>
            )}
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[20px] w-full align-middle">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Product current state
            </p>
            {state.amt != 0 && (              
                <button
                type="button"
                onClick={handleStopProduct}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                >
                <p className="text-white text-base font-semibold">
                Retreive Your Products
                </p>                
                </button>
              )}

            {state.amt === 0 && (  
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Product already sold out</h4>
              </div>
            )}
            </div>
            
            <div className="flex-1"> 
          </div> 
          </div>
  
          
        </div>
      </div>        
    )

}

export default ProductDetailsSellers