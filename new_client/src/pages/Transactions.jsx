import React, { useState, useEffect } from 'react'

import { DisplayTransactions } from '../components';
import { useStateContext } from '../context/index.jsx'

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  

  const { address, contract, getProducts, getUserTransactions } = useStateContext();
  const fetchProducts = async () => {
    setIsLoading(true);
    if(address) {
      const data = await getUserTransactions(address);
      setProducts(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(contract) fetchProducts();
  }, [address, contract]);

  return (
    <DisplayTransactions 
      title="Your Transactions"
      isLoading={isLoading}
      products={products}
    />
  )
}

export default Transactions