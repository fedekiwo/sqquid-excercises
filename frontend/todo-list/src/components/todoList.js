import React, { useEffect } from 'react';
// import TodoForm from './TodoForm';
import List from '@material-ui/core/List';
import TodoItem from './todoItem';
import AddTodoItem from './addTodoItem';
import { useTodoListStore } from "../store/index";
import EditModal from "./editTodoItemModal";

function onCheckBoxChange(updateTodoItem, todoItem) {
  return () => updateTodoItem(todoItem, { checked: !todoItem.checked });
}

function onDeleteClick(deleteTodoItem, todoItem) {
  // TODO add delete modal confirm
  return () => deleteTodoItem(todoItem);
}

function handleOpenModal(setOpenedModal, todoItem) {
  return () => setOpenedModal(todoItem);
}

function onItemEdition(setClosedModal, updateTodoItem) {
  return (todoItem, editedTodoItem) => {
    updateTodoItem(todoItem, editedTodoItem);
    setClosedModal();
  };
}

function mapItemWithListeners(updateTodoItem, deleteTodoItem, setOpenedModal) {
  return todoItem => ({
    onCheckBoxChange: onCheckBoxChange(updateTodoItem, todoItem),
    onDeleteClick: onDeleteClick(deleteTodoItem, todoItem),
    onTitleClick: handleOpenModal(setOpenedModal, todoItem),
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
  const {
    todoList, 
    setTodoList,
    updateTodoItem, 
    deleteTodoItem, 
    addToTodoList, 
    setTransientTodoItem, 
    transientTodoItem,
    setOpenedModal,
    setClosedModal,
    editModal,
    setModalState
  } = useTodoListStore();

  useEffect(() => {
    const todoList = localStorage.getItem("todoList") || JSON.stringify([]);
    setTodoList(JSON.parse(todoList));
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  });

  return (
    <List dense>
      { 
        todoList.map(mapItemWithListeners(updateTodoItem, deleteTodoItem, setOpenedModal))
        .map((todoItem, i) => (<TodoItem key={i} editModal={editModal} {...todoItem} />))
      }
      {
        <EditModal 
          onItemEdition={onItemEdition(setClosedModal, updateTodoItem)}
          onCancel={setClosedModal}
          onInputChange={setModalState}
          {...editModal}
        />
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