import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    isLoading: false,
  },
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    getSongsFailure: (state) => {
      state.isLoading = false;
    },
    addSong: (state, action) => {
      state.songs.push(action.payload);
      console.log("add song: ", action.payload);
      console.log(state.songs);
    },
    removeOneSong: (state, action) => {
      state.songs;
    },
    editSong: (state, action) => {
      const { id, data } = action.payload;
      const songIndex = state.songs.findIndex((song) => song.id === id);
      if (songIndex >= 0) {
        state.songs[songIndex] = { ...state.songs[songIndex], ...data };
        console.log("edit song: ", action.payload);
        console.log(state.songs);
      }
    },
  },
});

export const {
  getSongsFetch,
  getSongsSuccess,
  getSongsFailure,
  addSong,
  removeOneSong,
  editSong,
} = songSlice.actions;

export default songSlice.reducer;
