import {Route, Routes} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom/client";

import {navlinks} from './../constants';
import { Outlet, Link } from "react-router-dom";
// import {CreateProduct,Home,Transactions} from './../pages';

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";



const Services = () => {
    // The three services buttons that show the user to sell, buy or see transactions
    return (
        
        // put services in a purple box
        // p-7 sm:w-96 w-full flex flex-col grid sm:grid-cols-3 w-full mt-2 justify-start items-center 
        // <div className="grid sm:grid-cols-3 w-full mt-5 sm:w-96 flex-col ">
        //         {/* <div className="grid sm:grid-cols-3 w-full mt-5"> */}
        //             <div className={`rounded-tl-3xl rounded-bl-3xl ${companyCommonStyles}` }>
        //                 <Link to="/createProduct">Sell Products</Link>
        //             </div>
        //             <div className={companyCommonStyles}>
        //                 <Link to="/cart">Buy Products</Link>
        //             </div>
        //             <div className={`purple-glassmorphism sm:rounded-tr-2xl rounded-bl-3xl rounded-b-3xl ${companyCommonStyles}`}>
        //                 <Link to="/transactions"> Track Transactions</Link>
        //             </div>
        //         {/* </div> */}
        // </div>
        

                // https://wickedblocks.dev/groups/modal/#
    <div className="lg:p-20 sm:my-10 sm:align-middle sm:max-w-xl sm:w-full">
        <div className="justify-between w-full mx-auto mt-4 overflow-hidden rounded-lg wt-10 sm:flex service-glassmorphism">
            <div className="flex flex-row w-full">
                <Link to="/createProduct" className="flex items-center justify-center px-4 py-4 text-base font-semibold text-white border border-transparent lg:w-1/3 hover:bg-[#f9e5f1] hover:font-black hover:text-black sm:text-sm">
                    Sell Products
                </Link>
                <Link to="/cart" className="flex items-center justify-center px-4 py-4 text-base font-semibold text-white border border-transparent lg:w-1/3 hover:bg-[#f9e5f1] hover:text-black  hover:font-bold  sm:text-sm">
                    Buy Products
                </Link>
                <Link to="/transactions" className="flex items-center justify-center px-4 py-4 text-base font-semibold text-white border border-transparent lg:w-1/3 hover:bg-[#f9e5f1] hover:text-black hover:font-bold   sm:text-sm"> 
                    Track Transactions
                </Link>
            </div>
        </div>
    </div> 
    );
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Services />);
export default Services;