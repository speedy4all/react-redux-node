import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";
import { Menu } from "react-mdl";

export const PRODUCTS_ROUTE = "PRODUCTS_ROUTE";
export const SHOPPING_CART = "SHOPPING_CART";
export const OFFERS_ROUTE = "OFFERS_ROUTE";

const menu = props => {
  const menuItems = props.items.map((item, index) => {
    return (
      <MenuItem
        route={item.route}
        selected={item.selected}
        index={index}
        name={item.name}
        key={index}
        clickHandler={props.clickHandler}
      />
    );
  });

  return <Menu ripple>{menuItems}</Menu>;
};

export default menu;
