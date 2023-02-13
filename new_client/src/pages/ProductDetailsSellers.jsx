import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const ProductDetailsSellers = () => {

    const { state } = useLocation();
    const {observeBuyers,  contract, address } = useStateContext();  
    const [isLoading, setIsLoading] = useState(false);
    const [buyers, setBuyers] = useState([]);

    const fetchBuyers = async () => {
      setIsLoading(true);
      console.log(address);
      console.log(state.seller)
      // const data = await observeBuyers(state.pId);

      // setBuyers(data);
      setIsLoading(false);
      }
    
      useEffect(() => {
        if(contract) fetchBuyers();
      }, [contract, address])
    


    return (
        <div>
        {isLoading && <Loader />}
  
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img src="https://media.moddb.com/images/members/5/4550/4549205/duck.jpg" alt="product" className="w-full h-[410px] object-cover rounded-xl"/>
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div className="absolute h-full bg-[#4acd8d]" 
              style={{ width: `${calculateBarPercentage(state.price, state.amt)}%`,
               maxWidth: '100%'}}>
              </div>
            </div>
          </div>
  
          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title={`Price`} value={state.price} />
          <CountBox title={`Initial amount of ${state.init_amt}`} value={state.amt} />
          <CountBox title={`Out of 5`} value={state.rating} />

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
                  <img src="https://www.shutterstock.com/image-photo/seller-apron-market-260nw-720760306.jpg" alt="user" className="w-[60%] h-[60%] object-contain"/>
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
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Buyers</h4>
  
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
            <div className="flex-1"> 
          </div> 
          </div>
  
          
        </div>
      </div>        
    )

}

export default ProductDetailsSellers