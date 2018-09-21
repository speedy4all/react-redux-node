import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "react-mdl";

const DeleteProductDialog = props => {
  return (
    <Dialog open={props.open}>
      <DialogTitle>Are you sure ?</DialogTitle>
      <DialogContent>
        <p>This action can not be undone !</p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onDeleteConfirm}
          ripple
          raised
          primary
          type="button"
        >
          Yes
        </Button>
        <Button
          onClick={props.onDeleteCancelled}
          ripple
          raised
          accent
          type="button"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
