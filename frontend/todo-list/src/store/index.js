import _ from "lodash";
import create from "zustand";

function modifyByIndex(state, currentItem, cb) {
  const index = _.findIndex(state.todoList, todoItem => todoItem === currentItem);
  cb(index)
} 

const setOpeneModal = (prop, set) => todoItem => set({ [prop]: { open: true, todoItem, ...todoItem } });
const setClosedModal = (prop, set) => () => set({ [prop]: { open: false, todoItem: {} } });

const useTodoListStore = create((set, get) => ({
  todoList: [],
  transientTodoItem: null,
  editModal: { open: false, todoItem: {} },
  previewModal: { open: false, todoItem: {} },
  setOpenedPreviewModal: setOpeneModal("previewModal", set),
  setClosedPreviewModal: setClosedModal("previewModal", set),
  setOpenedModal: setOpeneModal("editModal", set),
  setModalState: modifiedProp => set(state => ({ editModal: { ...state.editModal, ...modifiedProp } })),
  setClosedModal: setClosedModal("editModal", set),
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
    set(state => { state.transientTodoItem = { title, checked: false, description: "" } });
  }
}));

export { useTodoListStore };
