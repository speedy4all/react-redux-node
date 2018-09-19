import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Textfield
} from "react-mdl";

class OrderDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: ""
    };
    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  onQuantityChange = e => {
    this.setState({ quantity: e.target.value });
  };
  render() {
    const currentProduct = this.props.currentProduct || {};
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Quantity for {currentProduct.name}</DialogTitle>
        <DialogContent>
          <Textfield
            onChange={this.onQuantityChange}
            pattern="-?[0-9]*(\.[0-9]+)?"
            error="Input is not a number!"
            label="Quantity..."
            required
            floatingLabel
            value={this.state.quantity}
          />
        </DialogContent>
        <DialogActions fullWidth>
          <Button type="button" onClick={this.props.onSubmitOrder}>
            Confirm
          </Button>
          <Button type="button" onClick={this.props._handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default OrderDialog;
