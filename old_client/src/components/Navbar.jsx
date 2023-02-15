import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
// import { ConnectWallet } from "@thirdweb-dev/react";



import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);


const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);
return (
  
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      
      <div className="mf:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        <p className="font-['futura'] font-semibold text-2xl sm:text-5xl text-gradient text-white cursor-pointer">Escryptow</p>
      </div>
      <ul className="text-white mf:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["About", "Services", "Technologies"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        {/* <li className="text-[#221C20] font-bold bg-[#8deef0] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#7ae3e6]">
          Connect
        </li> */}
        <a
        class="text-black flex items-center justify-center rounded-xl border-4 border-black bg-pink-100 px-3 py-2 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50"
        >
        Connect <span aria-hidden="true" role="img" class="ml-1.5">🦊</span>
        </a>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["About", "Services", "Technologies"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-3 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
);
}

export default Navbar;