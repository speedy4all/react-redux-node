import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Product from "./Product";

class ProductsList extends Component {
  render() {
    const products = this.props.products.map(product => (
      <Product key={product.id} {...product} />
    ));
    return [products];
  }
}

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
