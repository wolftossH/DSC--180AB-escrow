import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProductCard from './ProductCard';
import { loader } from '../assets';
import { useStateContext } from '../context';


const DisplayProducts = ({ title, isLoading, products }) => {
  const navigate = useNavigate();
  const {address } = useStateContext();

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
      <h1 className="font-epilogue font-semibold text-[30px] text-white text-center">
        {title} ({products.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">

      {!address && (
          <p className="font-epilogue font-semibold text-[20px] leading-[30px] text-[#818183] ml-5">
            You are not logged in
          </p>
        )}
        
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && address && products.length === 0 && (
          <p className="font-epilogue font-semibold text-[20px] leading-[30px] text-[#818183] ml-5">
            No products are available yet
          </p>
        )}

        {address && !isLoading && products.length > 0 && products.map((product) => <ProductCard 
          key={product.pId}
          {...product}
          handleClick={() =>  handleNavigate(product)}
        />)}
      </div>
    </div>
  )
}

export default DisplayProducts