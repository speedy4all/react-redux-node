import React from "react";
import { PropTypes } from "prop-types";
import Product from "./Product";

const ProductsList = props => {
  const products = props.products.map(product => (
    <li key={product.id}>
      <Product {...product} />
    </li>
  ));

  return (
    <div className="ProductsList">
      <ul>{products}</ul>
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      photoUrl: PropTypes.string,
      unitPrice: PropTypes.number
    })
  )
};

export default ProductsList;
