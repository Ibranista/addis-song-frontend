import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
// action methods
import {
  addSong,
  getSongsFailure,
  getSongsFetch,
  getSongsSuccess,
  editSong,
} from "./songSlice";

//getAllSongs url

const baseUrl = "https://addis-song-backend.onrender.com/songs";

function* getAllSongs() {
  try {
    const response: AxiosResponse<{ data: any }> = yield call(() =>
      axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
    );
    const formattedSongs: any = response.data;
    yield put(getSongsSuccess(formattedSongs));
  } catch (error: any) {
    console.log(error);
  }
}

// add song
const addSongsUrl = "https://addis-song-backend.onrender.com/songs/createSong";
function* addSongs(action: any) {
  try {
    const song: { data: any } = yield call(() =>
      axios.post(addSongsUrl, action.payload)
    );
    if (!song) {
      console.log("couldn`t register");
    }
    yield put(addSong(song));
  } catch (error) {
    console.log(error);
  }
}
// remove one song
const removeSongUrl = "https://addis-song-backend.onrender.com/songs/";
function* removeSong(action: any) {
  try {
    yield call(() => axios.delete(removeSongUrl + action.payload));
  } catch (error) {
    console.log(error);
  }
}
//edit a song
const editSongUrl = "https://addis-song-backend.onrender.com/songs/";
function* editSongs(action: any) {
  try {
    const song: { data: any } = yield call(() =>
      axios.put(`${editSongUrl}/${action.payload.id}`, action.payload.data)
    );
    if (!song) {
      console.log("couldn`t update");
    }
    yield put(editSong(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* songSaga() {
  yield takeEvery("songs/getSongsFetch", getAllSongs);
  yield takeEvery("songs/addSong", addSongs);
  yield takeEvery("songs/removeOneSong", removeSong);
  yield takeEvery("songs/editSong", editSongs);
}

export default songSaga;
