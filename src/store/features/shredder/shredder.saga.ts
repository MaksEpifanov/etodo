import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, put } from "redux-saga/effects";

import { deleteTodo } from "../todos/todos.slice";
import type { ITodo } from "../../../types";

import { addItemToShredder } from "./shredder.slice";

function* workerDeleteTodo(action: PayloadAction<ITodo>) {
  yield put(deleteTodo(action.payload.id));
}

function* watchAddToShredder() {
  yield takeEvery(addItemToShredder, workerDeleteTodo);
}

export default watchAddToShredder;
