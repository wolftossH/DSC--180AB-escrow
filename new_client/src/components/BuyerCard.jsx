import React from 'react'
import useFetch from "../hooks/gifGen";

// text reference: https://flowbite.com/docs/components/card/#card-with-list

const BuyerCard = ({buyers, title, }) => {
//   const gifUrl = useFetch({ title });
console.log(buyers)

  return (
    
    
<div className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-5 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
   </div>

   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {buyers.length > 0 ? buyers.map((item, index) => (
                <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full dark:text-white">
                                {index+1}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {item.buyer_address}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {item.delivery_address}
                            </p>
                        </div>
                    </div>
                </li>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-black font-semibold leading-[26px] text-justify dark:text-white">No buyers yet.</p>
                )}
        </ul>
   </div>

</div>

  )
}

export default BuyerCard
