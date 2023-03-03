import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../features/songSlice";

function AddSong() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    album: "",
    albumImageUrl: "",
  });
  const { title, artist, genre, album } = formData;
  //   let {} = useSelector((state: any) => state.songs);
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e: any) => {
    e.preventDefault();
    let songData = {
      title,
      artist,
      genre,
      album,
    };
    dispatch(addSong(songData));
    toast.success("Song added successfully");
  };
  return (
    <>
      <main>
        <form action="" onSubmit={onSubmit}>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
          />
          <input
            id="artist"
            type="text"
            name="artist"
            value={artist}
            onChange={onChange}
            placeholder="Artist"
          />
          <input
            id="genre"
            type="text"
            name="genre"
            value={genre}
            onChange={onChange}
            placeholder="Genre"
          />
          <input
            id="album"
            type="text"
            name="album"
            value={album}
            onChange={onChange}
            placeholder="Album"
          />
          <h1 className="text-white">hello</h1>
          <button type="submit">Add Song</button>
        </form>
      </main>
    </>
  );
}

export default AddSong;
