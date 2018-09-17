import { MENU_CHANGED, newMenuActive } from "./../Actions/ui";
import { PRODUCTS_ROUTE } from "./../../Menu/Menu";
import { getProducts } from "../Actions/products";

export const menuChangedFlow = ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === MENU_CHANGED) {
    let updateProducts = false;
    const state = getState();
    const newMenu = state.ui.menu.map((item, i) => {
      item.selected = i === action.payload;
      if (item.selected && item.route === PRODUCTS_ROUTE) {
        updateProducts = true;
      }
      return item;
    });

    if (updateProducts) {
      dispatch(getProducts());
    }

    dispatch(newMenuActive(newMenu));
  }
};

export const uiMdl = [menuChangedFlow];
