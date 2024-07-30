import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import "./OrderStatus.css";
import BoxImg from "../../assets/box.png";
import Dot from "@mui/icons-material/FiberManualRecord";

const OrderStatus = () => {
  const [orderData, setOrderData] = useState([]);
  const { url } = useContext(CartContext);

  const fetchUserOrders = async () => {
    if (localStorage.getItem("token")) {
      const response = await axios.get(url + "/api/order/user", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrderData(response.data.data);
    }
  };

  const updateStatus = () => {
    fetchUserOrders();
  }

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="order-main-container">
      <div className="order-container">
        <Typography variant="h5">All Orders</Typography>
        {orderData.map((order, index) => {
          return (
            <div key={index} className="order-item-container">
              <Card className="order-item-card">
                <CardMedia
                  className="cart-item-img"
                  component="img"
                  image={BoxImg}
                  alt=""
                />
                <Box className="order-des-box">
                  <CardContent className="order-item-des-container">
                    <Typography
                      className="order-des-name"
                      component="div"
                      variant="h5"
                    >
                      {order.items.map((item) => {
                        return item.name + " x " + item.quantity+', ';
                      })}
                    </Typography>
                    <Typography
                      className="order-des"
                      component="div"
                      variant="h5"
                    >
                      Payment: {order.payment}
                    </Typography>
                    <Typography
                      className="order-des-status"
                      component="div"
                      variant="h5"
                    >
                      {order.status === "Discarded" ? (
                        <Dot style={{ color: "red" }} className="dot" />
                      ) : (
                        <Dot style={{ color: "green" }} className="dot" />
                      )}
                      {order.status}
                    </Typography>
                    <Button onClick={updateStatus} className="update-btn" variant="contained">
                      Update
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;
