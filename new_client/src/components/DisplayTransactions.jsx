import React from 'react';
import { useNavigate } from 'react-router-dom';

import TransactionCard from './TransactionCard';
import { loader } from '../assets';
import { useStateContext } from '../context';


const DisplayTransactions = ({ title, isLoading, products }) => {
  const navigate = useNavigate();
  const {address} = useStateContext();

  const parsedProducts = products.filter((product) => product.status > 0); 

  // code readability
  // go to product details
  const handleNavigate = (product) => {
    if(product.seller === address)
      navigate(`/product-details-seller/${product.name}`, { state: product })
    else
      navigate(`/product-details/${product.name}`, { state: product })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[30px] text-white ml-10">{title} ({parsedProducts.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!address && (
          <p className="font-epilogue font-semibold text-[20px] leading-[30px] text-[#818183]">
            You are not logged in
          </p>
        )}

        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && parsedProducts.length === 0 && (
          <p className="font-epilogue font-semibold text-[20px] leading-[30px] text-[#818183]">
            You have not ordered anything yet.
          </p>
        )}
          
        {address && !isLoading && parsedProducts.length > 0 && parsedProducts.map((product) => <TransactionCard 
          key={product.pId}
          {...product}
          handleClick={() =>  handleNavigate(product)}
        />)}
      </div>
    </div>
  )
}

export default DisplayTransactions