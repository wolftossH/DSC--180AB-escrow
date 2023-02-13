import { Navbar,Navbar_new, Welcome, Footer, Services,  Loader } from "./components";
import {CreateProduct,BuyProduct,Transactions, ProductDetailsBuyers,ProductDetailsSellers,Profile } from './pages';
import {Route, Routes} from 'react-router-dom';


const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />

      {/* Design for users to click and redirect to those webpage */}
      <Routes>
        <Route path = "/" element = {<Welcome/>} />
        <Route path = "/createProduct" element = {<CreateProduct/>} />        
        <Route path = "/transactions" element = {<Transactions/>} />
        <Route path = "/cart" element = {<BuyProduct/>} />
        <Route path = "/profile" element = {<Profile/>} />
        <Route path="/product-details/:id" element={<ProductDetailsBuyers />} />
        <Route path="/product-details-seller/:id" element={<ProductDetailsSellers />} />
      </Routes>
      <div className="flex w-full justify-center items-center ">
        <Services />
      </div>
      
      <Footer /> 
    </div>
    
  </div>
);

export default App;