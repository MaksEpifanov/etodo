import { takeEvery, select } from "redux-saga/effects";
import useLocalStorage from "../../../hooks/useLocalStorage";

import {
  addTodo,
  changeTodo,
  deleteTodo,
  toggleComplete,
  updateTodos,
} from "./todos.slice";

import type { RootState } from "../../index";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { storeTodosToLS } = useLocalStorage();

function* workerSetDataToLS() {
  const {
    todos: { data },
  }: RootState = yield select((state: RootState) => state);
  yield storeTodosToLS(data);
}

function* watchSetDataFromLS() {
  yield takeEvery(addTodo, workerSetDataToLS);
  yield takeEvery(changeTodo, workerSetDataToLS);
  yield takeEvery(toggleComplete, workerSetDataToLS);
  yield takeEvery(updateTodos, workerSetDataToLS);
  yield takeEvery(deleteTodo, workerSetDataToLS);
}

export default watchSetDataFromLS;
