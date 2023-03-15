import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useMetamask, useAddress } from "@thirdweb-dev/react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from '../context';

import { CustomButton } from './';




import logo from "../../images/logo_orange_2.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);


const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);
    const connectWithMetamask = useMetamask();
    // const address = useAddress();
    // const connect = useMetamask();
    const { connect, address,getProducts } = useStateContext();
    const navigate = useNavigate();

    const handleClick = async () => {
      navigate(`/`)
    }


return (
  
    <nav className="w-full flex md:justify-center justify-between items-center p-5">      
      <div className="mf:flex-[0.92] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className=" cursor-pointer" onClick={handleClick}  />
        {/* <Link to="/" className="font-['futura'] font-semibold text-2xl sm:text-5xl text-gradient  text-white cursor-pointer"> 
          Escryptow
        </Link> */}
        {/* <p className="font-['futura'] font-semibold text-2xl sm:text-5xl text-gradient text-white cursor-pointer">
          Escryptow
        </p> */}
      </div>
      <ul className="text-white mf:flex hidden list-none flex-row justify-between items-center flex-initial">
        {/* {["About"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))} */}
        {/* <li className="text-[#221C20] font-bold bg-[#8deef0] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#7ae3e6]">
          Connect
        </li> */}
        <Link to="/about"  className="mr-5 my-2 text-xl"> 
          About
        </Link>

        <Link to="/"  className="mr-5 my-2 text-xl"> 
          Home
        </Link>
        <Link to="/profile" className="mr-5 my-2 text-xl"> 
          Profile
        </Link>
        <Link target="_blank" className="mr-5 my-2" to="https://www.coindesk.com/learn/how-to-set-up-a-metamask-wallet/"  > 
          Demo
        </Link>
        <Link target="_blank" to="https://www.coindesk.com/learn/how-to-set-up-a-metamask-wallet/"  > 
          How to
        </Link>
        <div className="sm:flex hidden flex-row justify-end gap-5 pl-3">
          <CustomButton 
            btnType="button"
            title={address ? 'Connected' : 'Connect Metamask'}
            styles={address ? '' : ''}
            handleClick={connect}
          />
        </div>
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
            {/* {["About"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-3 text-lg" />,
            )} */}
            <Link to="/"  className="mr-5 my-2 text-lg"> 
              Home
            </Link>
            <Link to="/about"  className="mr-5 my-2 text-lg"> 
              About
            </Link>
            <Link to="/profile" className="mr-5 text-lg"> 
              Profile
            </Link>
          </ul>
        )}
      </div>
    </nav>
);
}

export default Navbar;