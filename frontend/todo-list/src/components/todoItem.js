import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import { color } from "../constants";

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
  editColor: {
    color: "#78a2d2",
  },
  descriptionColor: {
    color,
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

  const { title, description, checked, onCheckBoxChange, onDeleteClick, onTitleClick, onDescriptionClick } = props;
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
      <ListItemText
        primary={title}
        className={classes[`listItemText${checked ? "--checked" : ""}`]} 
        onClick={onTitleClick}
      />
      <ListItemSecondaryAction>
        {
          description && <IconButton edge="end" aria-label="comments" className={classes.descriptionColor} onClick={onDescriptionClick}>
            <DescriptionIcon />
          </IconButton>
        }
        <IconButton edge="end" aria-label="comments" className={classes.editColor} onClick={onTitleClick}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="comments" className={classes.deleteColor} onClick={onDeleteClick}>
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TodoItem;