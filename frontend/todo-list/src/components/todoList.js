import React from 'react';
// import TodoForm from './TodoForm';
import List from '@material-ui/core/List';
import TodoItem from './todoItem';
import AddTodoItem from './addTodoItem';
import { useTodoListStore } from "../store/index";

function onCheckBoxChange(updateTodoItem, todoItem) {
  return () => updateTodoItem(todoItem, { checked: !todoItem.checked });
}

function onDeleteClick(deleteTodoItem, todoItem) {
  // TODO add delete modal confirm
  return () => deleteTodoItem(todoItem);
}

function mapItemWithListeners(updateTodoItem, deleteTodoItem) {
  return todoItem => ({
    onCheckBoxChange: onCheckBoxChange(updateTodoItem, todoItem),
    onDeleteClick: onDeleteClick(deleteTodoItem, todoItem),
    ...todoItem
  });
}

function onAddNewItem(addToTodoList, transientTodoItem) {
  return () => {
    // TODO add validations
    addToTodoList(transientTodoItem);
  }
}

function onNewItemChange(setTransientTodoItem) {
  return input => setTransientTodoItem(input.target.value);
}

function TodoList() {
  const { todoList, updateTodoItem, deleteTodoItem, addToTodoList, setTransientTodoItem, transientTodoItem } = useTodoListStore();
  return (
    <List dense>
      { 
        todoList.map(mapItemWithListeners(updateTodoItem, deleteTodoItem))
        .map((todoItem, i) => (<TodoItem key={i} {...todoItem} />))
      }
      {
        <AddTodoItem 
          onSubmit={onAddNewItem(addToTodoList, transientTodoItem)}
          onChange={onNewItemChange(setTransientTodoItem)} 
          title={transientTodoItem ? transientTodoItem.title || "" : ""}
        />
      }
    </List>
  );
}

export default TodoList;