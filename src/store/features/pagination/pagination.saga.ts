import { takeEvery, select, put } from "redux-saga/effects";
import type { RootState } from "../..";

import { updateTodos } from "../todos/todos.slice";
import { setMaxPage } from "./pagination.slice";

function* workerPagination() {
  const { todos }: RootState = yield select((state: RootState) => state);
  const { pagination }: RootState = yield select((state: RootState) => state);
  yield put(setMaxPage(Math.ceil(todos.data.length / pagination.limitItems)));
}

function* watchPagination() {
  yield takeEvery(updateTodos, workerPagination);
}

export default watchPagination;
