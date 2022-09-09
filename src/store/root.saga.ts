import { all, fork } from "redux-saga/effects";
import watchDeleteTodo from "./features/shredder/shredder.saga";
import watchPagination from "./features/pagination/pagination.saga";
import watchChangeFilters from "./features/filter/filter.saga";
import watchSetDataFromLS from "./features/todos/todos.saga";

export default function* rootSaga() {
  yield all([
    fork(watchPagination),
    fork(watchDeleteTodo),
    fork(watchChangeFilters),
    fork(watchSetDataFromLS),
  ]);
}
