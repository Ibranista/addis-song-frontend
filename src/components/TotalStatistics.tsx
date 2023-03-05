import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSongsFetch } from "../features/songSlice";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
function TotalStatistics() {
  const songs = useSelector((state: any) => state.songs.songs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch, songs]);
  let artists: any[] = [];
  let albums: any[] = [];
  let genres: any[] = [];
  for (let i = 0; i < songs.length; i++) {
    let artist = songs[i].artist.toLowerCase().trim();
    if (!artists.includes(artist)) {
      artists.push(artist);
    }
  }
  for (let i = 0; i < songs.length; i++) {
    let album = songs[i].album.toLowerCase().trim();
    if (!albums.includes(album)) {
      albums.push(album);
    }
  }
  for (let i = 0; i < songs.length; i++) {
    let genre = songs[i].genre.toLowerCase().trim();
    if (!genres.includes(genre)) {
      genres.push(genre);
    }
  }
  let genreCount: any = {};
  for (let genre of songs) {
    genre = genre.genre.toLowerCase().trim();
    genre in genreCount ? genreCount[genre]++ : (genreCount[genre] = 1);
  }
  const countArtist: { [artist: string]: { songs: number; albums: string[] } } =
    {};
  for (let i = 0; i < songs.length; i++) {
    let artist = songs[i].artist.toLowerCase();
    if (artist in countArtist) {
      countArtist[artist].songs++;
      if (!countArtist[artist].albums.includes(songs[i].album)) {
        countArtist[artist].albums.push(songs[i].album);
      }
    } else {
      countArtist[artist] = {
        songs: 1,
        albums: [songs[i].album],
      };
    }
  }
  const artistNumbers: JSX.Element[] = [];
  for (const [artist, count] of Object.entries(countArtist)) {
    artistNumbers.push(
      <div
        key={artist}
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        className="mb-3"
      >
        <h1>Artist: {artist}</h1>
        <h2 className="mb-2">
          Total songs:
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
            {" "}
            {count.songs}
          </button>
        </h2>
        <h2>
          Total albums:{" "}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
            {count.albums.length}
          </button>
        </h2>
      </div>
    );
  }

  type AlbumCountType = {
    [album: string]: {
      songs: number;
    };
  };

  const albumCount: AlbumCountType = {};
  for (let i = 0; i < songs.length; i++) {
    let album = songs[i].album;
    if (album in albumCount) {
      albumCount[album].songs++;
    } else {
      albumCount[album] = {
        songs: 1,
      };
    }
  }
  const albumNumbers: any = [];
  for (const [album, count] of Object.entries(albumCount)) {
    albumNumbers.push(
      <div key={album}>
        <h1>album: {album}</h1>
        <h2>
          Total songs:
          <button
            className="
          bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded
        "
          >
            {count.songs}
          </button>
        </h2>
      </div>
    );
  }
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/AccountCreation");
      }
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <div
      className="bg-gray-200
    flex justify-center items-center flex-wrap gap-3
    "
    >
      <section className="total">
        <h1
          className="
      text-4xl
      mb-3
      "
        >
          Total Statistics
        </h1>
        <ul className="bg-white rounded-lg shadow-lg p-6 mx-auto divide-y divide-gray-300">
          <li className="py-2">
            <span className="font-bold text-gray-700">
              Number of All songs:
            </span>{" "}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {songs.length}
            </button>
          </li>
          <li className="py-2">
            <span className="font-bold text-gray-700">
              Number of All Artists:
            </span>{" "}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {artists.length}
            </button>
          </li>
          <li className="py-2">
            <span className="font-bold text-gray-700">
              Number of All Albums:
            </span>{" "}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {albums.length}
            </button>
          </li>
          <li className="py-2">
            <span className="font-bold text-gray-700">
              Number of All Genres:
            </span>{" "}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {genres.length}
            </button>
          </li>
        </ul>
      </section>
      <section className="specific">
        <h1
          className="
      text-4xl
      mb-3
      "
        >
          Specific Stats
        </h1>
        <section className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto divide-y divide-gray-300 mb-5">
          <h1 className=" font-bold text-gray-700 mb-4">
            Total number of songs in every genre
          </h1>
          {Object.keys(genreCount).map((genre) => {
            return (
              <div className="py-2">
                <h2 className="font-bold text-gray-700">genre {genre}</h2>
                <p className="text-gray-500">has {genreCount[genre]} songs</p>
              </div>
            );
          })}
        </section>
      </section>
      <section className="total">
        <section className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto divide-y divide-gray-300 mb-5">
          <h1>Total of songs & albums each artist has</h1>
          {artistNumbers}
        </section>
      </section>
      <section
        className="
      bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto divide-y divide-gray-300
      "
      >
        <h1>Total of songs each album has</h1>
        {albumNumbers}
      </section>
    </div>
  );
}

export default TotalStatistics;
