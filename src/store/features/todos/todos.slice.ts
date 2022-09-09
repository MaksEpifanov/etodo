import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "../../../types";

interface IInitialState {
  data: ITodo[];
  filteredData: ITodo[];
}

const initialState: IInitialState = {
  data: [],
  filteredData: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.data = action.payload.sort((a, b) => a.created - b.created);
    },
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.data.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
    changeTodo: (state, action: PayloadAction<ITodo>) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) return { ...action.payload };
        return todo;
      });
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      state.data = state.data.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
        return { ...todo, completed: !todo.completed };
      });
    },
    updateFilteredData: (state, action: PayloadAction<ITodo[]>) => {
      state.filteredData = action.payload;
    },
  },
});

export const {
  updateTodos,
  deleteTodo,
  changeTodo,
  toggleComplete,
  addTodo,
  updateFilteredData,
} = todosSlice.actions;

export default todosSlice.reducer;
