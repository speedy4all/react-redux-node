import {
  MENU_CHANGED,
  newMenuActive,
  SEARCH_TRIGGERED,
  showSpinner,
  SHOW_ORDER_DIALOG,
  showDialog,
  setCurrentOrder,
  updateCart,
  CONFIRM_ADD_TO_CART
} from "./../Actions/ui";
import { PRODUCTS_ROUTE } from "./../../Menu/Menu";
import { getProducts, FETCH_PRODUCTS_SUCCESS } from "../Actions/products";
import { FETCH_PRODUCTS_ERROR } from "./../Actions/products";
import { apiRequest } from "../Actions/api";

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

export const searchActionFlow = ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === SEARCH_TRIGGERED) {
    const state = getState();
    const activeMenu = state.ui.menu.filter(item => item.selected);

    if (activeMenu && activeMenu.length > 0) {
      const apiConfig = getApiConfigForMenu(activeMenu[0], action);
      if (apiConfig) {
        dispatch(
          apiRequest(
            apiConfig.method,
            apiConfig.url,
            apiConfig.body,
            apiConfig.onSuccess,
            apiConfig.onError
          )
        );
        dispatch(showSpinner());
      }
    }
  }
};

export const showOrderDialogFlow = ({
  dispatch,
  getState
}) => next => action => {
  next(action);
  if (action.type === SHOW_ORDER_DIALOG) {
    const state = getState();
    const currentOrder = state.products.find(p => p.id === action.payload.id);
    dispatch(setCurrentOrder(currentOrder));
    dispatch(showDialog());
  }
};

export const addToCartConfirmation = ({
  dispatch,
  getState
}) => next => action => {
  next(action);
  if (action.type === CONFIRM_ADD_TO_CART) {
    const state = getState();
    const currentProduct = state.ui.currentOrder;
    const orderIds = [...state.ui.orderIds];
    orderIds.push(currentProduct.id);
    dispatch(updateCart(orderIds));
  }
};

const getApiConfigForMenu = (activeMenu, action) => {
  if (activeMenu.route === PRODUCTS_ROUTE) {
    return {
      method: "GET",
      url: `/products?search=${action.payload}`,
      body: null,
      onSuccess: FETCH_PRODUCTS_SUCCESS,
      onError: FETCH_PRODUCTS_ERROR
    };
  }
  return null;
};

export const uiMdl = [
  menuChangedFlow,
  searchActionFlow,
  showOrderDialogFlow,
  addToCartConfirmation
];
