import { Navbar, Welcome, Footer, Services,  Loader } from "./components";
import {CreateProduct,Home,Transactions} from './pages';
import {Route, Routes} from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom'

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />

      {/* Design for users to click and redirect to those webpage */}
      <Routes>
        <Route path = "/" element = {<Welcome/>} />
        <Route path = "/createProduct" element = {<createProduct/>} />        
        <Route path = "/transactions" element = {<Transactions/>} />
      </Routes>
      <div className="flex w-full justify-center items-center ">
        <Services />
      </div>
      
      <Footer /> 
    </div>
    
  </div>
);

export default App;