import React from 'react'

const CustomButton = ({ btnType, title, handleClick}) => {
  return (
    <button
      type={btnType}
      className={"text-black flex items-center justify-center  rounded-xl border-4 border-black bg-pink-100 px-3 py-2 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50"}
      onClick={handleClick}
    >
      {title}
      <span aria-hidden="true" role="img" className="ml-1.5">🦊</span>
    </button>
  )
}

export default CustomButton