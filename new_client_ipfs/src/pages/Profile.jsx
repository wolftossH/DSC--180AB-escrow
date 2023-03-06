import React, { useState, useEffect } from 'react'

import { DisplayProducts } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setCampaigns] = useState([]);

  const { address, contract, getUserProducts } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserProducts();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayProducts 
      title="Your Products"
      isLoading={isLoading}
      products={products}
    />
  )
}

export default Profile