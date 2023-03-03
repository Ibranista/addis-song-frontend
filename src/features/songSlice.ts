import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  id: number;
  title: string;
  artist: string;
}

interface SongState {
  songs: Song[];
  isLoading: boolean;
}

const initialState: SongState = {
  songs: [],
  isLoading: false,
};

export const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    getSongsFailure: (state) => {
      state.isLoading = false;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      console.log("add song: ", action.payload);
      console.log(state.songs);
    },
    removeOneSong: (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    editSong: (
      state,
      action: PayloadAction<{ id: number; data: Partial<Song> }>
    ) => {
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
