import { useContext } from "react";
import "./Cart.css";
//import { food_list } from "../../assets/assets";
import CloseIcon from '@mui/icons-material/Close';
import { CartContext } from "../../context/cartContext";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useNavigate } from "react-router-dom";

const Cart = ({setShowModal}) => {

  const authHandler = () => {
    if(localStorage.getItem('token')){
      navigate('/order');
    } else {
      setShowModal(true);
      window.scrollTo(0,0);
    }
  }

  const { cartItems, removeFromCart,food_list,url } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className="cart-main-container">
      <div className="cart-container">
        <Typography variant="h5">Your Cart Items</Typography>
        {food_list.map((food, index) => {
          if (cartItems[food._id] > 0) {
            return (
              <div key={index} className="cart-item-container">
                <Card className="cart-item-card">
                  <CardMedia
                    className="cart-item-img"
                    component="img"
                    image={url+'/images/'+food.image}
                    alt=""
                  />
                  <Box className="item-des-box">
                    <CardContent className="cart-item-des-container">
                      <Typography className='card-des-name' component="div" variant="h5">
                        {food.name}
                      </Typography>
                      <Typography className='card-des' component="div" variant="h5">
                        Qty: {cartItems[food._id]}
                      </Typography>
                      <Typography className='card-des' component="div" variant="h5">
                        Price: {food.price} $
                      </Typography>
                      <Typography className='card-des' component="div" variant="h5">
                        Total: {food.price * cartItems[food._id]} $
                      </Typography>
                      <CloseIcon onClick={()=>{removeFromCart(food._id)}} sx={{cursor:'pointer'}}/>
                    </CardContent>
                  </Box>
                </Card>
              </div>
            );
          }
        })}
          <CartSummary type="button" buttonText="Checkout" onClick={()=>{authHandler()}}/>
      </div>
    </div>
  );
};

export default Cart;
