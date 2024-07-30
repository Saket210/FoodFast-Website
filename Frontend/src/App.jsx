import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import AuthModal from "./components/AuthModal/AuthModal";
import { useState } from "react";

const theme = createMuiTheme({  
  typography: {
    fontFamily:"'Times New Roman', Times, serif !important",
  },
})


const App = () => {

  const [showModal,setShowModal] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      {showModal?<AuthModal setShowModal={setShowModal}/>:<></>}
      <div className="app-container">
        <Header setShowModal={setShowModal}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowModal={setShowModal}/>} />
          <Route path="/order" element={<Order />} />
          <Route path="/allorders" element={<OrderStatus />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
