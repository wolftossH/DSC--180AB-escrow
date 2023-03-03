import React from 'react'
import useFetch from "../hooks/gifGen";

// text reference: https://flowbite.com/docs/components/card/#card-with-list

const BuyerCard = ({buyers, title, }) => {
//   const gifUrl = useFetch({ title });

  return (
    
    
<div class="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-5 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
   </div>

   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {buyers.length > 0 ? buyers.map((item, index) => (
                <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full ">
                                {index+1}
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {item.buyer_address}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                {item.delivery_address}
                            </p>
                        </div>
                    </div>
                </li>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-black font-semibold leading-[26px] text-justify">No buyers yet.</p>
                )}
        </ul>
   </div>

</div>

  )
}

export default BuyerCard
