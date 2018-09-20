import React from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, CardText, CardActions, Button } from "react-mdl";

const Product = props => {
  const { id } = props;
  return (
    <Card
      shadow={0}
      style={{
        margin: "20px",
        flex: 1
      }}
    >
      <CardTitle
        style={{
          alignItems: "flex-end",
          height: "256px",
          color: "#fff",
          background: `url(${props.photoUrl}) center / cover`
        }}
      >
        {props.name}
      </CardTitle>
      <CardText style={{ textAlign: "left", padding: "10px 33px" }}>
        <div>Unit price: {props.unitPrice} RON</div>
        {props.description}
        {props.editMode ? (
          <div style={{ paddingTop: "10px" }}>
            <div>Order quantity: {props.quantity} pcs</div>
            <div>Total price: {props.quantity * props.unitPrice} RON</div>
          </div>
        ) : null}
      </CardText>

      <CardActions border>
        <Button
          colored
          hidden={props.editMode}
          onClick={() => props.onAddToCart(id)}
        >
          Add to cart
        </Button>
        <Button
          primary
          raised
          hidden={!props.editMode}
          onClick={() => props.onAddToCart(id)}
        >
          Change quantity
        </Button>
        <Button
          accent
          ripple
          raised
          style={{ marginLeft: "10px" }}
          hidden={!props.editMode}
          onClick={() => props.onDeleteProduct(id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
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
