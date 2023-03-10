import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import useFetch from "../hooks/gifGen";

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, FormField, ReviewCard, DescriptionCard } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';

const ProductDetailsBuyers = () => {
  const Default = 0
  const Started = 1
  const Confirmed = 2
  const Rejected = 3
  const Cancelled = 4
  const Finalized = 5
  const Reviewed = 6

  const { state } = useLocation();
  // console.log(state)

  const keyword = state.name;
  const gifUrl = useFetch({ keyword });
  console.log(gifUrl)
  const img = state.img
  const navigate = useNavigate();
  const {buyProduct,  contract, address,
    addRating, observeBuyers, getStatus} = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [delivery_address, setDelivery_address] = useState('');
  const [form, setForm] = useState({
    rate: '',
    review: '',
  });

  const [ratings, setRatings] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [pastBuyers, setPastBuyers] = useState([]);

  const review_ratings = state.reviews.map(function(e, i) {
    return [e, state.ratings[i],i];
  });
 

  const fetchBuyers = async () => {
    // const buyer_address = await observeBuyers(state.pId);
    // const data = await Promise.all(buyer_address.map(async (key,index) => {
    //     return {
    //       buyer_address: key,
    //       delivery_address: await  getDeliveryAddress(state.pId, key), 
    //       buyer_status: await getStatus(state.pId, key)
    //     }
    // }));
    // const past = data.filter((buyer) => buyer.buyer_status > 1)
    // const curr = data.filter((buyer) => buyer.buyer_status == 1)
    // setBuyers(curr);
    // setPastBuyers(past);
  }
    useEffect(() => {
      if(contract) fetchBuyers();
    }, [contract, address])
  
    const handleBuy = async () => {
      setIsLoading(true);
      await buyProduct(
        state.pId,
        delivery_address,
        ethers.utils.parseUnits(parseFloat(state.price*2).toString(), "ether")
      ); 
      setIsLoading(false);
      navigate('/transactions');    

    }

    const handleRating = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      await addRating(
        state.pId,
        Number(form.rate),
        form.review,
      ); 
      setIsLoading(false);
    }

    const handleFormFieldChange = (fieldName, e) => {
      setForm({ ...form, [fieldName]: e.target.value })
  }

  return (
      <div>
      {isLoading && <Loader />}

      <div className="flex md:flex-row flex-col mt-5 ml-10 gap-[15px]">
        <div className="flex-auto flex-col">
          <img src={img} alt="product" className="w-11/12 h-[500px] object-cover rounded-xl"/>
          <div className="relative w-11/12  h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" 
            style={{ width: `${calculateBarPercentage(state.init_amt, state.amt)}%`,
              maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[250px] w-full flex-wrap justify-between gap-[35px]">
          <CountBox title={`Price in ETH`} value={state.price} />
          <CountBox title={`Initial amount of ${state.init_amt}`} value={state.amt} />
          <CountBox title={`Out of 5 Stars`} value={state.avg_rating?.toFixed(2)} />
        </div>
      </div>

      {/* <div className="mt-[60px] flex lg:flex-row flex-col gap-5"> */}
      <div className="w-11/12 mt-[60px] ml-10 shadow-2xl rounded-lg p-10">
        <div className="flex flex-col gap-[40px]">
            {/* <h3 className="font-epilogue font-semibold text-[20px] text-white uppercase">
              Seller
            </h3> */}

            {/* <div className="mt-5 flex items-center gap-[14px]">
              <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full shadow-2xl">
                <img src={gifUrl} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[16px] text-white break-all">{state.seller}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]"> Products</p>
              </div>
            </div> */}

          <div>
            <DescriptionCard
              title= {state.name}
              seller={state.seller}
              description={state.description}
              gifUrl = {gifUrl}
            />
            {/* <h4 className="font-epilogue font-semibold text-[30px] text-white uppercase">Description</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-bold text-[20px] text-black leading-[26px] text-justify">{state.description}</p>
              </div> */}
          </div>

          <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[25px] text-white uppercase">Shop</h4>   

          {state.status===Rejected && (
              <div
              className="flex items-center justify-center px-4 py-4 text-base text-center font-bold text-black border border-transparent lg:w-full hover:bg-gray-700 sm:text-sm hover:text-white"
              >
                {/* <p className="text-black text-base font-semibold"> */}
                  You are Rejected
                {/* </p>                 */}
              </div>
            )}
          
          {state.status===Cancelled && (
              <div
              className="flex items-center justify-center px-4 py-4 text-base text-center font-bold text-black border border-transparent lg:w-full hover:bg-gray-700 sm:text-sm hover:text-white"
              >
                {/* <p className="text-black text-base font-semibold"> */}
                Already Cancelled
                {/* </p>                 */}
              </div>
            )}
            {state.status===Confirmed && (
              <div
              className="flex items-center justify-center px-4 py-4 text-base text-center font-bold text-black border border-transparent lg:w-full hover:bg-gray-700 sm:text-sm hover:text-white"
              >
                {/* <p className="text-black text-base font-semibold"> */}
                  Waiting for your delivered product to confirm
                {/* </p>                 */}
              </div>
            )}

            {state.status===Started && (
              <div
              className="flex items-center justify-center px-4 py-4 text-base text-center font-bold text-black border border-transparent lg:w-full hover:bg-gray-700 sm:text-sm hover:text-white"
              >
                {/* <p className="text-black text-base font-semibold"> */}
                  Waiting for Seller
                {/* </p>                 */}
              </div>
            )}

        {state.status == Default && (
        <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
            Buy this product
          </p>
          {state.amt != 0 && (
            <div className="mt-[30px]">
              <input 
                type="text"
                placeholder="Your address"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={delivery_address}
                onChange={(e) => setDelivery_address(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px] items-center">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Enjoy what you love</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">You will have to deposit twice the price</p>
              </div>

              <div className="">
              <CustomButton 
                btnType="button"
                title="Buy Product"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleBuy}
              />
              </div>

            </div>             

            )}
            {state.amt === 0 && (
              <h1 className="font-epilogue font-semibold text-[20px] leading-[22px] text-white">Products ran out</h1>
            )}
        </div>)}
        
        {state.status === Finalized && (
        <form onSubmit={handleRating} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
            Rate this product
          </p>
          {(
            <div className="mt-[30px]">
                  <FormField 
                      labelName="Rating *"
                      placeholder="out of 5"
                      inputType="number"
                      value={form.rate}
                      handleChange={(e) => handleFormFieldChange('rate', e)}
                  />
                  <FormFizeld 
                  labelName="Review *"
                  placeholder="Product Review "
                  isTextArea
                  value={form.review}
                  handleChange={(e) => handleFormFieldChange('review', e)}
                  />
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Enjoy what you love</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Feedback is important to us</p>
              </div>

              <CustomButton 
                btnType="submit"
                title="Rate it"
                styles="w-full bg-[#8c6dfd]"
              />
            </div>             

            )}
        </div>
        </form>
        )}
        
        {state.status === Reviewed && (
        <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
        <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
          Rate this product
        </p>
          <div className="mt-[30px]">
            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Enjoy what you love</h4>
              <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Thank you for rating us</p>
            </div>
          </div>
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
        </div>
      </div>
    </div>        
  )
}

export default ProductDetailsBuyers