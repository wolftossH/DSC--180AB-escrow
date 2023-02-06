import {Route, Routes} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom/client";

import {navlinks} from './../constants';
import { Outlet, Link } from "react-router-dom";
// import {CreateProduct,Home,Transactions} from './../pages';

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


const Services = () => {
    return (
        
        // put services in a purple box
        // p-7 sm:w-96 w-full flex flex-col grid sm:grid-cols-3 w-full mt-2 justify-start items-center 
        <div className="grid sm:grid-cols-3 w-full mt-5 sm:w-96 flex-col ">
                {/* <div className="grid sm:grid-cols-3 w-full mt-5"> */}
                    <div className={`rounded-tl-3xl rounded-bl-3xl ${companyCommonStyles}` }>
                        Sell Products
                    </div>
                    <div className={companyCommonStyles}>Buy Products</div>
                    <div className={`purple-glassmorphism sm:rounded-tr-2xl rounded-bl-3xl rounded-b-3xl ${companyCommonStyles}`}>
                    Track Transactions
                    </div>
                {/* </div> */}
        </div>

    );
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Services />);
export default Services;