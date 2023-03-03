import { configureStore } from "@reduxjs/toolkit";
import songReducer from "../features/songSlice";
import songSaga from "../features/songService";
import createSagaMiddleware from "@redux-saga/core";

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: [saga],
});
saga.run(songSaga);
