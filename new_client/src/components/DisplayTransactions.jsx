import React from 'react';
import { useNavigate } from 'react-router-dom';

import TransactionCard from './TransactionCard';
import { loader } from '../assets';
import { useStateContext } from '../context';


const DisplayTransactions = ({ title, isLoading, products }) => {
  const navigate = useNavigate();
  const {address, getStatus } = useStateContext();
  

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
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({products.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && products.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not order anything yet.
          </p>
        )}

        {!isLoading && products.length > 0 && products.map((product) => <TransactionCard 
          key={product.pId}
          {...product}
          handleClick={() =>  handleNavigate(product)}
        />)}
      </div>
    </div>
  )
}

export default DisplayTransactions