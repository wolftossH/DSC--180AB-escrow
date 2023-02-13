import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context/index.jsx'

const BuyProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setCampaigns] = useState([]);

  const { address, contract, getProducts } = useStateContext();

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getProducts();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchProducts();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Products"
      isLoading={isLoading}
      products={products}
    />
  )
}

export default BuyProduct