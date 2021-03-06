import React from 'react';
import { Button, List, ListItem, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import TextField from "./textField";
import DescriptionEditMenu from "./descriptionEditMenu";
import Dialog from "./dialog"

export default function EditModal(props) {
  const { onCancel, onItemEdition, open, todoItem, title, description, onInputChange, ...other} = props;
  const onChange = prop => input => onInputChange({ [prop]: input.target.value });

  return (
    <Dialog
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
           <DescriptionEditMenu 
            onChangeDescription={onChange("description")}
            description={description}
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
    </Dialog>
  );
}
