import React from "react";
import { PRODUCTS_ROUTE, SHOPPING_CART } from "./../Menu/Menu";
import ProductsList from "./../Products/ProductsList";
import { Spinner } from "react-mdl";

const ContentContainer = props => {
  return (
    <div>
      {props.loading ? (
        <Spinner />
      ) : props.selectedMenu && props.selectedMenu.route === PRODUCTS_ROUTE ? (
        <ProductsList
          products={props.products}
          onAddToCart={props.onAddToCart}
        />
      ) : props.selectedMenu && props.selectedMenu.route === SHOPPING_CART ? (
        <ProductsList
          editMode
          products={props.shoppingCart}
          onAddToCart={props.onAddToCart}
          onDeleteProduct={props.deleteInProgress}
        />
      ) : null}
    </div>
  );
};

export default ContentContainer;
