import React, { useState } from 'react';

import { tagType, thirdweb } from '../assets';
import useFetch from "../hooks/gifGen";
import { useStateContext } from '../context';
import { useLocation, useNavigate } from 'react-router-dom';

import { Outlet, Link } from "react-router-dom";



const TransactionCard = ({ seller, name, description, price, amountCollected, status, pId, handleClick }) => {

//   const remainingDays = daysLeft(deadline);
  const keyword = name;
  const gifUrl = useFetch({ keyword });
  const kw = 'Escrow'
  const cryptoGif = useFetch({ keyword });
  const [isLoading, setIsLoading] = useState(false);


  const { state } = useLocation();
  const {address, getStatus, cancelBuy, approveReceipt } = useStateContext();

  const getUserStatus = async () => {    
    const status = await getStatus(pId, seller)
    return status
  }

  // console.log(getUserStatus)

  const handleCancelBuy = async () => {
    setIsLoading(true)
    const data = await cancelBuy(pId);
    setIsLoading(false);
  }

  const handleApproveReceipt = async () => {
    setIsLoading(true)
    const data = await approveReceipt(pId);
    setIsLoading(false);
  }

  return (
    <div className="sm:w-[485px] w-full rounded-[20px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img src={gifUrl} alt="fund" className="w-full h-[250px] object-cover rounded-[15px]"/>
      <div className="flex flex-col p-10">
        <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Escrow</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[20px] text-white text-left leading-[26px] truncate">{name}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px]">Price: {price} GoerliETH</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={cryptoGif} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{seller}</span></p>
        </div>
      </div>

      {/* Need to redesign this       */}
      <div className="lg:p-1 sm:my-5 sm:align-middle sm:max-w-xl sm:w-full">
        <div className="justify-between w-full mx-auto mt-4 overflow-hidden rounded-lg wt-10 sm:flex green-glassmorphism">
          <div className="flex flex-row w-full">
            {status===1 && (
              // <div
              // className="flex items-center justify-center px-4 py-4 text-base font-normal text-white border border-transparent lg:w-1/3 hover:bg-gray-800 sm:text-sm"
              // >
              //   <div>
              //   <p className="text-white text-base font-semibold">
              //     Waiting for Seller Decision
              //   </p>
              //   </div>
              // </div>    
              <button
              type="button"
              onClick={handleCancelBuy} 
              className="flex items-center justify-center px-4 py-4 text-base font-normal text-white border border-transparent lg:w-1/3 hover:bg-gray-800 sm:text-sm"
              >
                <p className="text-white text-base font-semibold">
                  Reject Your Purchase
                </p>                
              </button>           
            )}

            {status===2 && (
              <button
              type="button"
              onClick={handleApproveReceipt} 
              className="flex items-center justify-center px-4 py-4 text-base font-normal text-white border border-transparent lg:w-1/3 hover:bg-gray-800 sm:text-sm"
              >
                <p className="text-white text-base font-semibold">
                  Approve Your Receipt
                </p>                
              </button>
            )}

            {status===3 && (
              <div
              className="flex items-center justify-center px-4 py-4 text-base font-normal text-white border border-transparent lg:w-1/3 hover:bg-gray-800 sm:text-sm"
              >
                <p className="text-white text-base font-semibold">
                  You already cancelled to Buy or Seller did not want to sell
                </p>                
              </div>
            )}
            {status===4 && (
              <div
              className="flex items-center justify-center px-4 py-4 text-base font-normal text-white border border-transparent lg:w-1/3 hover:bg-gray-800 sm:text-sm"
              >
                <p className="text-white text-base font-semibold">
                  You already Bought this product
                </p>                
              </div>
            )}
              <Link to="/cart" className="flex items-center justify-center px-4 py-4 text-base font-normal text-white border border-transparent lg:w-1/3 hover:bg-gray-800 sm:text-sm">
                Reject Buyer
              </Link>
          </div>
        </div>
      </div> 
      
    </div>
  )
}

export default TransactionCard