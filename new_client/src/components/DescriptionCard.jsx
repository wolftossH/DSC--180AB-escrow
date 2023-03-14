import React from 'react'
import useFetch from "../hooks/gifGen";

// reference design: https://tailwindcomponents.com/component/tailwind-css-product-card-with-title-and-author

const DescriptionCard = ({seller, title,  description, gifUrl}) => {
//   const gifUrl = useFetch({ title });

  return (
<a
  className="relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6"
  
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div className="justify-between sm:flex">
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>
      <p className="mt-1 text-xs font-medium text-slate-600">By {seller}</p>
    </div>

    <div className="flex-shrink-0 hidden ml-3 sm:block">
      <img
        className="object-cover w-16 h-16 rounded-lg shadow-sm"
        src= {gifUrl}
        alt="product"
      />
    </div>
  </div>

  <div className="mt-4 text-2xl">
    Description
    <p className="text-base text-slate-500">
      {description}
    </p>
  </div>


</a> 
  )
}

export default DescriptionCard
