import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  GET_PRODUCTS,
  SELECT_PRODUCT,
  updateProducts
} from "../Actions/products";
import { showSpinner, hideSpinner } from "./../Actions/ui";
import { apiRequest } from "./../Actions/api";

// this middleware only care about the getProducts action
export const getProductsFlow = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === GET_PRODUCTS) {
    dispatch(
      apiRequest(
        "GET",
        `/products`,
        null,
        FETCH_PRODUCTS_SUCCESS,
        FETCH_PRODUCTS_ERROR
      )
    );
    dispatch(showSpinner());
  }
};

// on successful fetch, process the products data
export const processProductsCollection = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    dispatch(updateProducts(action.payload));
    dispatch(hideSpinner());
  }
};

// notify about an order in progress, dispatch an order event
export const selectProductFlow = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === SELECT_PRODUCT) {
    //   dispatch(orderInProgress());
    //   dispatch(createOrder(action.payload))
  }
};

export const productsMdl = [
  getProductsFlow,
  processProductsCollection,
  selectProductFlow
];
