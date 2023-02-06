import { Navbar, Welcome, Footer, Services, Transactions, Loader } from "./components";

const App = () => (
  <div className="min-h-screen">
  {/* // <div > */}
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
      {/* <Loader /> */}
    </div>
    {/* <Services />
    <Transactions />
    <Footer /> */}
  </div>
);

export default App;