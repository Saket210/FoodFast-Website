import { Typography } from "@mui/material";
import "./Order.css";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import axios from "axios";

const Order = () => {
  const { food_list, cartItems, calculateAmount, url } =
    useContext(CartContext);

  const [delData, setDelData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDelData({ ...delData, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let items = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemDetail = item;
        itemDetail["quantity"] = cartItems[item._id];
        items.push(itemDetail);
      }
    });
    let orderData = {
      items: items,
      address: delData,
      amount: calculateAmount() + 2,
    };
    if(localStorage.getItem('token')){
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        const session_url = response.data.session_url;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    }
  };

  return (
    <div className="order-main container">
      <div className="delivery-info-container">
        <form onSubmit={placeOrder} className="delivery-info-form">
          <div className="delivery-info-fields">
            <Typography className='delivery-header' variant="h5" align="center">
              Delivery Information
            </Typography>
            <input
              name="name"
              required="true"
              onChange={onChange}
              value={delData.name}
              type="name"
              placeholder="Enter your name..."
            />
            <input
              name="address"
              required="true"
              onChange={onChange}
              value={delData.address}
              type="address"
              placeholder="Enter your address..."
            />
            <div className="div-location">
              <input
                name="city"
                required="true"
                onChange={onChange}
                value={delData.city}
                type="text"
                placeholder="City"
              />
              <input
                name="state"
                required="true"
                onChange={onChange}
                value={delData.state}
                type="text"
                placeholder="State"
              />
            </div>
            <input
              name="phone"
              required="true"
              onChange={onChange}
              value={delData.phone}
              type="phone"
              placeholder="Phone No."
            />
          </div>
          <CartSummary type="submit" buttonText="Proceed to Pay" onClick={()=>{}} />
        </form>
      </div>
    </div>
  );
};

export default Order;
