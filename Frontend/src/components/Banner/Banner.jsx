import { Typography } from "@material-ui/core";
import './Banner.css'

const Banner = () => {

  return (
    <div className="main-container">
    <div className="banner-container">
        <Typography  className="banner-text">Hate cooking ?</Typography>
        <Typography  className="banner-text1">{"We're for you, \nLeave the meal prepping to us, \nServing good food straight to your door, \nYour partner in hunger."}</Typography>
    </div>
    </div>
  );
};

export default Banner;
