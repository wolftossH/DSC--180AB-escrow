import React from 'react';

import { star } from '../assets';
import useFetch from "../hooks/gifGen";

const ReviewCard = (reviews) => {
//   const remainingDays = daysLeft(deadline);
  const keyword = name;
  const gifUrl = useFetch({ keyword });
  const kw = 'Escrow'
  const cryptoGif = useFetch({ keyword });
  // console.log(reviews)
  const review = reviews[0]
  const rating = reviews[1]

  
  return (
    <div className="sm:w-[300px] h-fit w-full rounded-3xl bg-white mb-5 ml-5">
      <div className="flex flex-col p-5">
        <div className="flex flex-row items-center mb-[20px]">
          
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[30px] text-[#808191] mr-5">{rating}</p>
          <img src={star} alt="tag" className="w-[35px] h-[30px] object-contain"/>
        </div>

        <div className="block">
          {/* <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{name}</h3> */}
          <p className="mt-[5px] font-epilogue text-[16px] font-normal text-[#808191] text-left leading-[18px] leading-relaxed">{review}</p>
        </div>

        {/* <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{rating} stars</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Price: {price} GoerliETH</p>
          </div>
        </div> */}

        {/* <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={cryptoGif} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{seller}</span></p>
        </div> */}
      </div>
    </div>
  )
}

export default ReviewCard