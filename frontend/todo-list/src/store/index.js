import _ from "lodash";
import create from "zustand";

function modifyByIndex(state, currentItem, cb) {
  const index = _.findIndex(state.todoList, todoItem => todoItem === currentItem);
  cb(index)
} 

const useTodoListStore = create((set, get) => ({
  todoList: [],
  transientTodoItem: null,
  setTodoList: todoList => set({ todoList }),
  addToTodoList: newItem => set({
    todoList: [...get().todoList, newItem],
    transientTodoItem: null
  }),
  deleteTodoItem: itemToDelete => {
    set(state => {
      modifyByIndex(state, itemToDelete, index => state.todoList.splice(index, 1));
    });
  },
  updateTodoItem: (originalTodoItem, update) => {
    set(state => {
      modifyByIndex(state, originalTodoItem, index => { state.todoList[index] = { ...originalTodoItem, ...update } });
    });
  },
  setTransientTodoItem: (title) => {
    set(state => { state.transientTodoItem = { title, checked: false } });
  }
}));

export { useTodoListStore };
