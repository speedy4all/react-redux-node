import React from "react";
import PropTypes from "prop-types";

const Product = props => {
  return (
    <div className="Product">
      <span>Name : {props.name}</span>
      <span>Description : {props.description}</span>
      <img src={props.photoUrl} alt={props.name} />
      <span>Unit price: {props.unitPrice}</span>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  photoUrl: PropTypes.string,
  unitPrice: PropTypes.number
};

export default Product;
