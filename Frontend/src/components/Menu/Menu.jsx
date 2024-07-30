import { Typography } from "@material-ui/core";
import { menu_list } from "../../assets/assets";
import "./Menu.css";

const Menu = ({category,setCategory}) => {

  return (
    <div className="Menu-Container" id="Menu">
      <Typography className="menu-title">Explore Our Menu</Typography>
      <div className="menu-div">
        {menu_list.map((item, index) => {
          return (
            <div key={index} className="menu-list-item">
              <img
                onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}
                className={
                  category === item.menu_name ? "mactive" : "minactive"
                }
                width={110}
                height={110}
                src={item.menu_image}
                alt=""
                loading="lazy"
              />
              <Typography className="menu-name">{item.menu_name}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
