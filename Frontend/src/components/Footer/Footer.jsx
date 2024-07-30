import { Typography } from '@material-ui/core'
import Logo from "../../assets/food_logo.png";
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
        <img width={150} height={60} src={Logo} alt="" loading="lazy" />
        <Typography className='footer-text'>Copyright 2024 © FoodFast.com All Rights Reserved</Typography>
    </div>
  )
}

export default Footer