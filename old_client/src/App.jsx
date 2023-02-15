import { Navbar,Navbar_new, Welcome, Footer, Services,  Loader } from "./components";
import {CreateProduct,BuyProduct,Transactions, ProductDetails } from './pages';
import {Route, Routes} from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom'

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
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
      <div className="flex w-full justify-center items-center ">
        <Services />
      </div>
      
      <Footer /> 
    </div>
    
  </div>
);

export default App;