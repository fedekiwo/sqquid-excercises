import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';
import { FormControl, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { color } from "../constants";
import TextField from "./textField";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    "-webkit-transform": "rotate(90deg)",
    "-moz-transform": "rotate(90deg)",
    "-ms-transform": "rotate(90deg)",
    "-o-transform": "rotate(90deg)",
    transform: "rotate(90deg)",
    display: "inline-block",
    color
  },
  addIcon: {
    color,
    "padding-left": "9px"
  },
  formControl: {
    width: "100%",
  },
  "MuiInput-root": {
    color
  }
}));

function AddTodoItem(props) {
  const classes = useStyles();
  const { onSubmit, onChange, title } = props;

  return (
    <ListItem button>
      <ListItemIcon onClick={onSubmit}>
        <AddIcon className={classes.addIcon} />
      </ListItemIcon>
      <ListItemText>
        <FormControl className={classes.formControl}>
          <TextField
            name="title"
            value={title}
            placeholder="What would you like to do next...?" 
            className={classes["MuiInput-root"]}
            onChange={onChange}
            onKeyDown={e => e.key === "Enter"? onSubmit(e) : null}
            color="primary"
            required
          />
        </FormControl>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments" onClick={onSubmit}>
          <NavigationIcon className={classes.submitButton} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default AddTodoItem;