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
      <main className="bg-slate-300">
        <h1
          className="
        text-xl
        text-left
        font-bold
        text-gray-800
        mt-10
        mb-10
        md:text-6xl
        md:text-center
        "
        >
          Add Song Form
        </h1>
        <form
          action=""
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center p-10
          bg-gradient-to-r from-gray-400 to-slate-600
          
          "
        >
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
            className="bg-gray-200
            border-2 border-gray-300
            rounded-md
            md:w-96
            w-64
            h-10
            px-5
            text-gray-700
            focus:outline-none
            focus:border-indigo-500
            mb-3
            "
          />
          <input
            id="artist"
            type="text"
            name="artist"
            value={artist}
            onChange={onChange}
            placeholder="Artist"
            className="bg-gray-200
            border-2 border-gray-300
            rounded-md
            md:w-96
            w-64
            h-10
            px-5
            text-gray-700
            focus:outline-none
            focus:border-indigo-500
            mb-3"
          />
          <input
            id="genre"
            type="text"
            name="genre"
            value={genre}
            onChange={onChange}
            placeholder="Genre"
            className="bg-gray-200
            border-2 border-gray-300
            rounded-md
            md:w-96
            w-64
            h-10
            px-5
            text-gray-700
            focus:outline-none
            focus:border-indigo-500
            mb-3"
          />
          <input
            id="album"
            type="text"
            name="album"
            value={album}
            onChange={onChange}
            placeholder="Album"
            className="bg-gray-200
            border-2 border-gray-300
            rounded-md
            md:w-96
            w-64
            h-10
            px-5
            text-gray-700
            focus:outline-none
            focus:border-indigo-500
            mb-3"
          />
          <button
            type="submit"
            className="
          border-2 border-gray-300
          rounded-md
          md:w-96
          w-64
          h-10
          hover:bg-slate-700
          hover:text-white
          "
          >
            Add Song
          </button>
        </form>
      </main>
    </>
  );
}

export default AddSong;
