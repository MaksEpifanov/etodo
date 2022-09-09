import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.saga";

import todos from "./features/todos/todos.slice";
import pagination from "./features/pagination/pagination.slice";
import shredder from "./features/shredder/shredder.slice";
import filter from "./features/filter/filter.slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todos,
    pagination,
    shredder,
    filter,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
