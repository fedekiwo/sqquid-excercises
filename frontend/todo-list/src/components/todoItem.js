import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const color = "#e4e4e4";
const useStyles = makeStyles((theme) => ({
  "listItemText--checked":{
    color,
    "text-decoration": "line-through"
  },
  listItemText: {
    color
  },
  deleteColor: {
    color: "#ff8282",
  },
  "MuiCheckbox-root": {
    color
  },
  checkedBackground: {
    background: "#299c29",
    "&:hover": {
      background: "#64a564"
    }
  },
  checkedText: {
    "text-decoration": "line-through"
  },
  listItem: {
    margin: "2px 0"
  }
}));


function TodoItem(props) {
  const classes = useStyles();

  const { title, checked, onCheckBoxChange, onDeleteClick } = props;
  return (
    <ListItem button className={`${classes.listItem} ${checked ? classes.checkedBackground : ""}`}>
      <ListItemIcon>
        <Checkbox
          color="default"
          edge="end"
          checked={checked}
          onChange={onCheckBoxChange}
          className={classes["MuiCheckbox-root"]}
        />
      </ListItemIcon>
      <ListItemText primary={title}  className={classes[`listItemText${checked ? "--checked" : ""}`]} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments" className={classes.deleteColor} onClick={onDeleteClick}>
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TodoItem;