import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const ProductDetails = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    // const { donate, getDonations, contract, address } = useStateContext();
  
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState([]);

    return (
    <div>
        {isLoading && <Loader />}
    </div>
        
    )

}

export default ProductDetails