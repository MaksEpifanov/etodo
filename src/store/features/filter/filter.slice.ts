import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  title: string;
  dateIn: number | null;
  dateOut: number | null;
  completed: number;
  onFilter: boolean;
}

const initialState: IInitialState = {
  title: "",
  dateIn: null,
  dateOut: null,
  completed: 0,
  onFilter: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeDateIn: (state, action: PayloadAction<number>) => {
      state.dateIn = action.payload;
    },
    changeDateOut: (state, action: PayloadAction<number>) => {
      state.dateOut = action.payload;
    },
    changeCompleted: (state, action: PayloadAction<number>) => {
      state.completed = action.payload;
    },
    onFilter: (state, action: PayloadAction<boolean>) => {
      state.onFilter = action.payload;
    },
    clearFilters: (state) => {
      state.completed = 0;
      state.dateIn = null;
      state.dateOut = null;
      state.title = "";
      state.onFilter = false;
    },
  },
});

export const {
  changeTitle,
  changeCompleted,
  changeDateIn,
  changeDateOut,
  clearFilters,
  onFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
