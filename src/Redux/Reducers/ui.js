import { SHOW_SPINNER, HIDE_SPINNER, NEW_MENU_ACTIVE } from "../Actions/ui";
import { PRODUCTS_ROUTE, OFFERS_ROUTE } from "./../../Menu/Menu";

const initUi = {
  pending: false,
  orderInProcess: false,
  isLoggedIn: true,
  menu: [
    {
      name: "Produse",
      selected: true,
      route: PRODUCTS_ROUTE
    },
    {
      name: "Oferte",
      selected: false,
      route: OFFERS_ROUTE
    },
    {
      name: "Comenzile mele",
      selected: false,
      route: null
    }
  ]
};

export function uiReducer(state = initUi, action) {
  switch (action.type) {
    case SHOW_SPINNER:
      return { ...state, pending: true };

    case HIDE_SPINNER:
      return { ...state, pending: false };

    case NEW_MENU_ACTIVE:
      return { ...state, menu: [...action.payload] };

    default:
      return state;
  }
}
