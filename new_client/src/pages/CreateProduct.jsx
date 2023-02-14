import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createProduct } = useStateContext();
    const [form, setForm] = useState({
      name: '',
      description: '',
      price: '', 
      image: '',
      deposit: ''
    });

    const handleSubmit = async (e) => {
        // never want to reload the page after form submission
        e.preventDefault();
        setIsLoading(true)
        await createProduct(
            {
            ...form,
            price: ethers.utils.parseUnits(form.price, "ether"),
            // deposit: ethers.utils.parseUnits(form.deposit, "ether")
        })
        setIsLoading(false);
        navigate('/');
    
        // checkIfImage(form.image, async (exists) => {
        //   if(exists) {
        //     setIsLoading(true)
        //     await createProduct(
        //         {
        //         ...form,
        //         price: ethers.utils.parseUnits(form.price, "ether"),
        //         // deposit: ethers.utils.parseUnits(form.deposit, "ether")
        //     })
        //     setIsLoading(false);
        //     navigate('/');
        //   } else {
        //     alert('Provide valid image URL')
        //     setForm({ ...form, image: '' });
        //   }
        // })
      }

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && <Loader />}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Sell a Product</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px]">
                    <FormField 
                    labelName="Your Product *"
                    placeholder="John Doe"
                    inputType="text"
                    value={form.name}
            
                    handleChange={(e) => handleFormFieldChange('name', e)}
                    />
                    <div className="flex flex-wrap gap-[40px]">
                    <FormField 
                        labelName="Price *"
                        placeholder="ETH 0.50"
                        inputType="number"
                        value={form.price}
                        handleChange={(e) => handleFormFieldChange('price', e)}
                    />
                    <FormField 
                        labelName="Amount *"
                        placeholder="Amount"
                        inputType="number"
                        value={form.amt}
                        handleChange={(e) => handleFormFieldChange('amt', e)}
                    />
                    </div>
                </div>
                    <FormField 
                    labelName="Description *"
                    placeholder="Product Description "
                    isTextArea
                    value={form.description}
                    handleChange={(e) => handleFormFieldChange('description', e)}
                    />
                <div className="w-full flex justify-start items-center p-4 bg-[#e587ed] h-[120px] rounded-[20px]">
                    <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
                    <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
                        You have to deposit 1x the amount
                    </h4>
                </div>
                <FormField 
                        labelName="Deposit *"
                        placeholder="ETH 0.50"
                        inputType="number"
                        value={form.price}
                        handleChange={(e) => handleFormFieldChange('deposit', e)}
                    />
                {/* <FormField 
                labelName="Campaign image *"
                placeholder="Place image URL of your campaign"
                inputType="url"
                value={form.image}
                handleChange={(e) => handleFormFieldChange('image', e)}
                /> */}
                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton 
                    btnType="submit"
                    title="Submit new campaign"
                    styles="bg-[#1dc071]"
                    />
                </div>
            </form>
        </div>

    )
}

export default CreateProduct