import { takeEvery, select, put } from "redux-saga/effects";
import type { RootState } from "../..";

import { updateFilteredData } from "../todos/todos.slice";
import { clearFilters, onFilter } from "./filter.slice";

function* workerOnFilter() {
  const { filter, todos }: RootState = yield select(
    (state: RootState) => state
  );
  let filteredData = [...todos.data];

  if (filter.title) {
    filteredData = filteredData.filter((todo) =>
      todo.title.includes(filter.title)
    );
  }

  if (filter.completed === 1) {
    filteredData = filteredData.filter((todo) => todo.completed);
  }
  if (filter.completed === 2) {
    filteredData = filteredData.filter((todo) => !todo.completed);
  }

  if (filter.dateIn) {
    filteredData = filteredData.filter((todo) => todo.dateIn > filter.dateIn);
  }

  if (filter.dateOut) {
    filteredData = filteredData.filter((todo) => todo.dateOut < filter.dateOut);
  }

  yield put(updateFilteredData(filteredData));
}

function* workerClearFilters() {
  yield put(updateFilteredData([]));
}

function* watchChangeFilter() {
  yield takeEvery(onFilter, workerOnFilter);
  yield takeEvery(clearFilters, workerClearFilters);
}

export default watchChangeFilter;
