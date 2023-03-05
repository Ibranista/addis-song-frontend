import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch, removeOneSong, editSong } from "../features/songSlice";

type Song = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
};

type Props = {
  songs: Song[];
};

const Container = styled.div``;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  wrap: wrap;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const ArtistImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const SongDetailsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const SongTitle = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const SongArtist = styled.h3`
  font-size: 18px;
  margin: 8px 0;
`;

const SongAlbum = styled.p`
  font-size: 16px;
  margin: 8px 0;
`;

const SongGenre = styled.p`
  font-size: 16px;
  margin: 8px 0;
`;

const SongButton = styled.button`
  font-size: 16px;
`;
const SongList = () => {
  const songs = useSelector((state) => state.songs.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch, songs]);

  const removeSong = (id) => {
    dispatch(removeOneSong(id));
  };

  const [showEdit, setShowEdit] = useState(false);
  const [editSongId, setEditSongId] = useState("");
  const [songData, setSongData] = useState("");

  const handleEditClick = (id, data) => {
    setEditSongId(id);
    setShowEdit(true);
    setSongData(data);
  };

  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortGenre, setSortGenre] = useState(false);
  const genres = [...new Set(songs.map((song) => song.genre))];
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const sortedSongs = songs
    .filter((song) => !selectedGenre || song.genre === selectedGenre)
    .sort((a, b) => (sortGenre ? a.genre.localeCompare(b.genre) : 0));

  return (
    <>
      <select value={selectedGenre} onChange={handleGenreChange}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button onClick={() => setSortGenre(!sortGenre)}>
        {sortGenre ? "Sort by Title" : "Sort by Genre"}
      </button>
      <div>
        {sortedSongs.map((song) => (
          <div key={song._id}>
            <h2>{song.title}</h2>
            <h3>{song.artist}</h3>
            <p>Album: {song.album}</p>
            <p>Genre: {song.genre}</p>
            <button onClick={() => removeSong(song._id)}>Delete</button>
            <button
              onClick={() =>
                handleEditClick(song._id, {
                  artist: song.artist,
                  title: song.title,
                  album: song.album,
                  genre: song.genre,
                })
              }
            >
              Edit
            </button>
          </div>
        ))}
        {showEdit && (
          <EditSong id={editSongId} songsData={songData} editStatus={setShowEdit} />
        )}
      </div>
    </>
  );
};

export default SongList;
  

type EditSongProps = {
  id: string;
  songsData: any;
  editStatus: any;
};

const EditSong = ({ id, songsData, editStatus }: EditSongProps) => {
  const [song, setSong] = useState(songsData);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(editSong({ id, data: song }));
      editStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>Edit Song</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={song.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={song.artist}
          onChange={handleChange}
        />
        <input
          type="text"
          name="album"
          placeholder="Album"
          value={song.album}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={song.genre}
          onChange={handleChange}
        />

        <button type="submit">Update Song</button>
      </form>
    </Container>
  );
};
