import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { misc } from "../../assets/assets";
import { useContext} from "react";
import "./FoodItem.css";
import { CartContext } from "../../context/cartContext";

const Fooditem = ({ id, name, price, description, image }) => {

  const {cartItems,addToCart,removeFromCart} = useContext(CartContext);

  return (
    <Grid item className="food-item">
      <Card elevation={3} className="food-card" sx={{ maxWidth: 345 }}>
        <CardMedia className="food-img" component="img" alt="" image={image} />
        <CardContent>
          <div className="item-count">
            <AddIcon
              onClick={() => addToCart(id)}
              className="count-icon"
            />
            <Typography className="count-txt">{cartItems[id]?cartItems[id]:0}</Typography>
            <RemoveIcon
              onClick={() =>removeFromCart(id)}
              className="count-icon"
            />
          </div>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <CardMedia className="rating" component="img" alt="" image={misc} />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography className="price" variant="body2" color="text.secondary">
            {price}$
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Fooditem;
