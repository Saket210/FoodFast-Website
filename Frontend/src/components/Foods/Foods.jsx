import {Grid, Typography } from "@material-ui/core";
//import { food_list} from "../../assets/assets";
import './Foods.css'
import Fooditem from "../FoodItem/Fooditem";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

const Foods = ({category}) => {

  const {food_list,url} = useContext(CartContext)

  return (
    <div className="food-main-container">
      <Typography className="food-title">Explore foods</Typography>
      <Typography className="food-des">
        To eat is a necessity but to eat intelligently is an art
      </Typography>
      <Typography className="food-des">
        Choose from a list of foods items and add them to your cart
      </Typography>
      <Grid container spacing={8} className="food-item-container">
        {food_list.map((item, index) => 
            {
                if(category==='All' || category===item.category){
                   return <Fooditem key={index} id={item._id} name={item.name} image={url+'/images/'+item.image} price={item.price} description={item.description} />
                }
            }
          )
        }
      </Grid>
    </div>
  );
};

export default Foods;
