import React from 'react';
import { Button, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Dialog from "./dialog";
import MD from "./md";

export default function EditModal(props) {
  const { onClose, open, title, description, ...other} = props;

  return (
    <Dialog
      disableEscapeKeyDown
      aria-labelledby="preview-modal"
      color="secondary"
      maxWidth="md"
      fullWidth
      open={open}
      {...other}
    >
      <DialogTitle id="preview-modal">{ title }</DialogTitle>
      <DialogContent>
        <MD description={description} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
