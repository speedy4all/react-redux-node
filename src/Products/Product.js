import React from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, CardText, CardActions, Button } from "react-mdl";

const Product = props => {
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
      <CardText>{props.description}</CardText>
      <CardActions border>
        <Button>Click me</Button>
        <CardText>Unit price: {props.unitPrice}</CardText>
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
