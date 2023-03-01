import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import useFetch from "../hooks/gifGen";

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, ReviewCard } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
// import { thirdweb } from '../assets';

const ProductDetailsSellers = () => {

  const { state } = useLocation();
  console.log(state)
  const keyword = state.name;
  const gifUrl = useFetch({ keyword });
  const {observeBuyers,  contract, address, stopProduct, approvePurchase, rejectPurchase, getDeliveryAddress, getStatus} = useStateContext();  
  const [isLoading, setIsLoading] = useState(false);
  const [reject_buyer, setRejectBuyer] = useState([]);
  const [confirm_buyer, setConfirmBuyer] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [pastBuyers, setPastBuyers] = useState([]);

  const Default = 0
  const Started = 1
  const Confirmed = 2
  const Rejected = 3
  const Cancelled = 4
  const Finalized = 5
  const Reviewed = 6

  const fetchBuyers = async () => {
    const buyer_address = await observeBuyers(state.pId);
    const data = await Promise.all(buyer_address.map(async (key,index) => {
        return {
          buyer_address: key,
          delivery_address: await  getDeliveryAddress(state.pId, key), 
          buyer_status: await getStatus(state.pId, key)
        }
    }));
    const past = data.filter((buyer) => buyer.buyer_status > 1)
    const curr = data.filter((buyer) => buyer.buyer_status == 1)
    setBuyers(curr);
    setPastBuyers(past);
  }

  const review_ratings = state.reviews.map(function(e, i) {
    return [e, state.ratings[i],i];
  });

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
      reject_buyer,
    ); 
    setIsLoading(false);
  }

  const handleConfirm = async () => {
    setIsLoading(true);
    await approvePurchase(
      state.pId,
      confirm_buyer,
    ); 
    setIsLoading(false);
  }


    return (
        <div>
        {isLoading && <Loader />}
  
        {/* <div className="flex ml-20 mt-20"> */}
        <div className="flex md:flex-row flex-col mt-5 ml-10 gap-[15px]">
          <div className="flex-auto flex-col">
            <img src={gifUrl} alt="product" className="w-11/12 h-[500px] object-cover rounded-xl"/>
            <div className="relative w-11/12  h-[5px] bg-[#3a3a43] mt-2">
              <div className="absolute h-full bg-[#4acd8d]" 
              style={{ width: `${calculateBarPercentage(state.init_amt, state.amt)}%`,
               maxWidth: '100%'}}>
              </div>
            </div>
          </div>
  
          <div className="flex md:w-[300px] w-full flex-wrap justify-between gap-[20px]">
            <CountBox title={`Price in ETH`} value={state.price} />
            <CountBox title={`Initial amount of ${state.init_amt}`} value={state.amt} />
            <CountBox title={`Out of 5 Stars`} value={state.avg_rating?.toFixed(2)} />
          </div>
        </div>
  
        {/* <div className="flex ml-20 mt-20"> */}
          <div className="w-11/12 mt-[60px] ml-10 shadow-2xl rounded-lg p-10">
        <div className="flex flex-col gap-[40px]">


          {/* <div className="text-xl ml-20 space-y-20 text-white shadow-2xl rounded-lg p-20"> */}
            <div>
              <h3 className="font-epilogue font-semibold text-[20px] text-white uppercase">
                Seller
              </h3>

              <div className="mt-5 flex items-center gap-[14px]">
                <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full shadow-2xl">
                  <img src={gifUrl} alt="user" className="w-[60%] h-[60%] object-contain"/>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[16px] text-white break-all">{state.seller}</h4>
                  {/* <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]"> Products</p> */}
                </div>
              </div>
            </div>
  
            <div>
              <h4 className="font-epilogue font-semibold text-[30px] text-white uppercase">Description</h4>

                <div className="mt-[20px]">
                  <p className="font-epilogue font-bold text-[20px] text-black leading-[26px] text-justify">{state.description}</p>
                </div>
            </div>
  
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Current Waiting Buyers</h4>
              {/* <div>
                {address && !isLoading && state.ratings.length > 0 && state.ratings.map((x) => <FundCard 
                key={x}
                {...product}
                />)}
              </div> */}
              <div className="mt-[15px] flex flex-col gap-4">
                {buyers.length > 0 ? buyers.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex justify-between items-center gap-4">
                    <div className="font-epilogue font-normal text-[16px] text-black font-semibold leading-[26px] break-ll">
                      {index + 1}. {item.buyer_address}
                      <div>
                        Address: {item.delivery_address}
                      </div> 
                    </div>

                    {/* <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p> */}
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-black font-semibold leading-[26px] text-justify">No buyers yet.</p>
                )}
              </div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase mt-10">Past Buyers</h4>
              {pastBuyers.length > 0 ? pastBuyers.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex justify-between items-center gap-4 mt-[15px] ">
                    <div className="font-epilogue font-normal text-[16px] text-black font-semibold leading-[26px] break-ll">
                      {index + 1}. {item.buyer_address}
                      <div>
                        Address: {item.delivery_address}
                      </div> 
                    </div>

                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No buyers yet.</p>
                )}
            </div>

            <div className="flex flex-row w-full">
            {buyers.length != 0  && (
              <div className="mt-[10px] w-1/2 flex flex-col p-5 bg-[#1c1c24] rounded-[10px] ">
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
                    value={reject_buyer}
                    onChange={(e) => setRejectBuyer(e.target.value)}
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

{buyers.length != 0 && (
              <div className="mt-[10px] w-1/2 flex flex-col p-5 bg-[#1c1c24] rounded-[10px] ">
              <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Good Buyers
              </p>
              {/* {state.amt != 0 && ( */}
                <div className="mt-[30px]">
                  <input 
                    type="text"
                    placeholder="Buyer to confirm"
                    step="0.01"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={confirm_buyer}
                    onChange={(e) => setConfirmBuyer(e.target.value)}
                  />    
                  <CustomButton 
                    btnType="button"
                    title="Confirm Buyer"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleConfirm}
                  />
                </div>             
    
                {/* )} */}
                {state.amt === 0 && (
                  <h1 className="font-epilogue font-semibold text-[20px] leading-[22px] text-white">Products ran out</h1>
                )}
            </div>
            )}
            </div>
            <h1 className="font-epilogue font-semibold text-[30px] text-white uppercase">Reviews</h1>
          <div  className="w-full flex flex-wrap mt-[20px] gap-[26px]">
            {review_ratings.length > 0 && review_ratings.map((review, i) => <ReviewCard 
            key={i}
            {...review}
            handleClick={() =>  handleNavigate(product)}
          />)}
          </div>

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