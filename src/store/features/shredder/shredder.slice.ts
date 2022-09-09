import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../../types";

interface IInitialState {
  data: ITodo[];
}

const initialState: IInitialState = {
  data: [],
};

const shredderSlice = createSlice({
  name: "shredder",
  initialState,
  reducers: {
    addItemToShredder: (state, action: PayloadAction<ITodo>) => {
      state.data.push(action.payload);
    },
    cleanShredder: (state) => {
      state.data = [];
    },
  },
});

export const { addItemToShredder, cleanShredder } = shredderSlice.actions;

export default shredderSlice.reducer;
