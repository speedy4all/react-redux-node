import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, CardText, CardActions, Button } from "react-mdl";

class Product extends Component {
  render() {
    const props = this.props;

    return (
      <Card
        key={props.id}
        shadow={0}
        style={{
          width: "400px",
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
          <CardText>Unit price: {props.unitPrice}</CardText>
        </CardActions>
      </Card>
    );
  }
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  photoUrl: PropTypes.string,
  unitPrice: PropTypes.number
};

export default Product;
