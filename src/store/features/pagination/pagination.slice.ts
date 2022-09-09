import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  limitItems: number;
  maxPage: number;
  currentPage: number;
}

const initialState: IInitialState = {
  limitItems: 15,
  currentPage: 1,
  maxPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state) => {
      if (state.maxPage > state.currentPage) {
        state.currentPage += 1;
      }
    },
    setMaxPage: (state, action) => {
      state.maxPage = action.payload;
    },
  },
});

export const { setCurrentPage, setMaxPage } = paginationSlice.actions;

export default paginationSlice.reducer;
