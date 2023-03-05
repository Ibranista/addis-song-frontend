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
  //songs[]
  const songs = useSelector((state: any) => state.songs.songs);
  // reducer songs(inside store)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch, songs]);

  const removeSong = (id: string) => {
    dispatch(removeOneSong(id));
  };

  const [showEdit, setShowEdit] = useState(false);
  const [editSongId, setEditSongId] = useState("");
  const [songData, setSongData] = useState("");

  const handleEditClick = (id: string, data: any) => {
    setEditSongId(id);
    setShowEdit(true);
    setSongData(data);
  };

  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortGenre, setSortGenre] = useState(false);
  const genres = [...new Set(songs.map((song: any) => song.genre))];
  const handleGenreChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedGenre(e.target.value);
  };

  const sortedSongs = songs
    .filter(
      (song: { genre: string }) =>
        !selectedGenre || song.genre === selectedGenre
    )
    .sort((a: { genre: string }, b: { genre: any }) =>
      sortGenre ? a.genre.localeCompare(b.genre) : 0
    );

  return (
    <>
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-x-slate-700 mb-3 hover:cursor-pointer"
      >
        <option value="">All Genres</option>
        {genres.map(
          (genre: any): JSX.Element => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          )
        )}
      </select>
      <button
        onClick={() => setSortGenre(!sortGenre)}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-x-slate-700 mb-3 hover:bg-white"
      >
        {sortGenre ? "Sort by Title" : "unsort"}
      </button>
      <ContainerWrapper className="flex-col md:flex-row pb-5 flex-wrap">
        {sortedSongs.map((song: any) => (
          <Container
            key={song._id}
            className="flex flex-col mr-2 flex-wrap md:flex-row hover:bg-gray-300 hover:scale-105
          transition duration-500 ease-in-out 
           md:w-1/3 lg:w-1/4 xl:w-1/5
          rounded-lg shadow-lg
          hover:cursor-pointer mb-5
          "
          >
            <ImageContainer>
              <ArtistImage
                src={
                  "https://c4.wallpaperflare.com/wallpaper/15/304/59/music-musical-notes-abstract-digital-art-wallpaper-preview.jpg"
                }
                alt={song.artist}
              />
            </ImageContainer>
            <SongDetailsContainer className="border-2">
              <SongTitle className="text-xl underline font-bold">
                {song.title}
              </SongTitle>
              <SongArtist>{song.artist}</SongArtist>
              <SongAlbum>Album: {song.album}</SongAlbum>
              <SongGenre>Genre: {song.genre}</SongGenre>
              <SongButton
                onClick={() => removeSong(song._id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full mb-2"
              >
                Delete
              </SongButton>
              <SongButton
                onClick={() =>
                  handleEditClick(song._id, {
                    artist: song.artist,
                    title: song.title,
                    album: song.album,
                    genre: song.genre,
                  })
                }
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              >
                Edit Me
              </SongButton>
            </SongDetailsContainer>
          </Container>
        ))}
        {showEdit && (
          <EditSong
            id={editSongId}
            songsData={songData}
            editStatus={setShowEdit}
          />
        )}
      </ContainerWrapper>
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
