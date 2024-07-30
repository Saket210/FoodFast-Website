import { AppBar, Toolbar, Button, Box, IconButton, Typography } from "@material-ui/core";
import Logo from "../../assets/food_logo.png";
import { Link } from "react-router-dom";
import "./Header.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from "../../context/cartContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../context/authContext";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ setShowModal }) => {
  const [menu, setMenu] = useState("Home");
  const { calculateAmount } = useContext(CartContext);
  const { userToken,setUserToken } = useContext(AuthContext);
  const [showDropdown,setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleDropdown = ()=> {
    if(showDropdown){
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  const logout = ()=> {
    localStorage.removeItem("token");
    setUserToken("");
    setShowDropdown(false);
    navigate('/');
    window.location.reload();
  }

  const allorders = () => {
    navigate('/allorders');
    setShowDropdown(false);
  }

  return (
    <>
      <AppBar className="appbar" position="relative">
        <Toolbar className="toolbar">
          <img style={{cursor:'pointer'}} onClick={()=>{navigate('/')}} width={150} height={60} src={Logo} alt="" loading="lazy" />
          <Box className="navbox">
            <ul className="header-nav">
              <li
                onClick={() => {
                  setMenu("Home");
                }}
              >
                <Link
                  className={menu === "Home" ? "active" : "inactive"}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <a href="#Menu"
                className={menu === "Menu" ? "active" : "inactive"}
                onClick={() => {
                  setMenu("Menu");
                }}
              >
                Menu
              </a>
            </ul>
          </Box>
          <div className="icon-div">
            <Link to={"/cart"}>
              <IconButton className="carticon">
              <Badge color='error' variant="dot" invisible={!calculateAmount()}>
                <ShoppingCartIcon className="icon-dim"/>
              </Badge>
              </IconButton>
            </Link>
            {!userToken ? (
              <Button
                onClick={() => {
                  setShowModal(true);
                }}
                className="button"
                variant="contained"
              >
                SignIn
              </Button>
            ) : (
              <div className="dropdown">
                <IconButton className="profile-icon">
                <AccountCircleIcon onClick={handleDropdown} className="icon-dim"/>
                </IconButton>
                {
                  showDropdown?<ul className="dropdown-list">
                  <li onClick={allorders} className="dropdown-list-item"><ShoppingBagIcon className="icon-dim carticon"/><Typography>All Orders</Typography></li>
                  <hr style={{border:0}}/>
                  <li onClick={logout} className="dropdown-list-item"><LogoutIcon className="icon-dim carticon"/><Typography>Logout</Typography></li>
                </ul>: <></>
                }
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
