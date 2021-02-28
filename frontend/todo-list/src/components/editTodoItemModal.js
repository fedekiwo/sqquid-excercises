import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import { color, background } from "../constants";
import TextField from "./textField";

const CustomCssDialog = withStyles({
  root: {
    '& .MuiDialog-paper': {
      color,
      background
    }
  },
})(Dialog);

export default function EditModal(props) {
  const { onCancel, onItemEdition, open, todoItem, title, description, onInputChange, ...other} = props;
  const onChange = prop => input => onInputChange({ [prop]: input.target.value });

  return (
    <CustomCssDialog
      disableEscapeKeyDown
      aria-labelledby="edit-modal"
      color="secondary"
      maxWidth="md"
      fullWidth
      open={open}
      {...other}
    >
      <DialogTitle id="edit-modal">Edit your todo item!</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <TextField 
              name="title-edit"
              value={title}
              onChange={onChange("title")}
              color="primary"
              style={{ width: "100%" }}
            />
          </ListItem>
          <ListItem>
            <TextareaAutosize
              placeholder="Complete with a description of your task..."
              rowsMin={10}
              value={description}
              onChange={onChange("description")}
              style={{ background: "#4b515f", color, width: "100%" }}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onItemEdition(todoItem, { title, description })} color="primary">
          Save
        </Button>
      </DialogActions>
    </CustomCssDialog>
  );
}
