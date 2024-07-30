import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const CartContext = createContext(null);

const CartContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [food_list,setFoodList] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev=>({...prev,[itemId]:1}));
        } else {
            setCartItems(prev=>({...prev, [itemId]:prev[itemId]+1}));
        }

        if(localStorage.getItem('token')){
            await axios.post(url+'/api/cart/add', {itemId},{headers: {authorization:`Bearer ${localStorage.getItem('token')}`}})
        }
    }

    const removeFromCart = async (itemId) => {
        if(cartItems[itemId]>0) {
            setCartItems(prev=>({...prev, [itemId]:prev[itemId]-1}));
        }
        if(localStorage.getItem('token')){
            await axios.post(url+'/api/cart/remove', {itemId},{headers: {authorization:`Bearer ${localStorage.getItem('token')}`}})
        }
    }

    const calculateAmount = () => {
        let subTotal=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemPrice = food_list.find((listItem)=>listItem._id===item).price;
                subTotal+=cartItems[item]*itemPrice;
            }
        }
        return subTotal;
    }

    const getCartData = async () => {
        if (localStorage.getItem("token")) {
          const response = await axios.get(url+'/api/cart/get',{headers: {authorization:`Bearer ${localStorage.getItem('token')}`}});
          setCartItems(response.data.cartData);
        }
    }
    
    const fetchFoodList = async () => {
        const response = await axios.get(url+'/api/food/list');
        setFoodList(response.data.data);
    }

    useEffect(() => {
        async function getFoodCartData () {
          await Promise.all([
            await fetchFoodList(),
            await getCartData()
          ])
        }
        getFoodCartData();
      },[])

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        calculateAmount,
        food_list,
        setFoodList,
        url
    }
    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;