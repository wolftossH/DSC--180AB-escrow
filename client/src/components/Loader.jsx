// const Loader = () => (
//     <div className="flex justify-center items-center py-3">
//       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700" />
//     </div>
//   );
  
//   export default Loader;
import React from 'react'

import { loader } from '../assets';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/>
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">Transaction is in progress <br /> Please wait...</p>
    </div>
  )
}

export default Loader