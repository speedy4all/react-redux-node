import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Textfield
} from "react-mdl";

const AddProductDialog = props => {
  const { currentProduct } = props;
  let existing = false;
  return (
    <Dialog open={props.open}>
      <DialogTitle>Quantity for {currentProduct.name}</DialogTitle>
      <DialogContent>
        <span>
          {props.shoppingCart.map(p => {
            existing = p.id === currentProduct.id;
            if (existing) {
              return (
                <div>
                  <span>Order quantity: {p.quantity}</span>
                  <br />
                </div>
              );
            }
          })}
        </span>
        <span>Total price: </span>
        <b>{currentProduct.quantity * currentProduct.unitPrice || 0}</b>
        <span> RON </span>
        <Textfield
          onChange={props.onQuantityChange}
          pattern="-?[0-9]*(\.[0-9]+)?"
          error="Input is not a number!"
          label={existing ? "Add another..." : "Quantity..."}
          required
          floatingLabel
          value={currentProduct.quantity}
        />
      </DialogContent>
      <DialogActions fullWidth>
        <Button ripple primary type="button" onClick={props.confirmAddToCart}>
          Confirm
        </Button>
        <Button ripple accent type="button" onClick={props.handleCloseDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
