import { Button, Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import './CartSummary.css'

const CartSummary = ({buttonText, onClick, type}) => {
  const { calculateAmount } = useContext(CartContext);

  return (
    <div className="cart-summary">
      <Card className="cart-summary-card">
        <CardContent>
          <Typography className="summary-title" align="center">
            Cart Summary
          </Typography>
          <Typography className="summary-fields">
            Total:<span className="summary-amounts">{calculateAmount()}$</span>
          </Typography>
          <Typography className="summary-fields">
            Delivery Fee:<span className="summary-amounts">2$</span>
          </Typography>
          <Typography className="summary-fields">
            Amount Payable:
            <span className="summary-amounts">{calculateAmount()===0?0:calculateAmount() + 2}$</span>
          </Typography>
            <div className="button-div">
              <Button className="checkout-button" type={type} onClick={onClick} variant="contained">
                {buttonText}
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartSummary;
