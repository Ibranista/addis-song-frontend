import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSongsFetch } from "../features/songSlice";
function TotalStatistics() {
  const songs = useSelector((state: any) => state.songs.songs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch, songs]);
  let artists = [];
  let albums = [];
  let genres = [];
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
  for (let i = 0; i < songs.length; i++) {
    let genre = songs[i].genre.toLowerCase().trim();
    if (genre in genreCount) {
      genreCount[genre]++;
    } else {
      genreCount[genre] = 1;
    }
  }
  const countArtist: any = {};
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
  const artistNumbers: any = [];
  for (const [artist, count] of Object.entries(countArtist)) {
    artistNumbers.push(
      <div
        key={artist}
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
      >
        <h1>Artist: {artist}</h1>
        <h2>Total songs: {count.songs}</h2>
        <h2>Total albums: {count.albums.length}</h2>
      </div>
    );
  }
  const albumCount: any = {};
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
        <h1>{album}</h1>
        <h2>Total songs: {count.songs}</h2>
      </div>
    );
  }
  return (
    <div>
      <h1>Total Statistics</h1>
      <ul>
        <li>Number of All songs: {songs.length}</li>
        <li>Number of All Artists: {artists.length}</li>
        <li>Number of All Albums: {albums.length}</li>
        <li>Number of All Genres: {genres.length}</li>
      </ul>
      <h1>Specific Stats</h1>
      <h1>total number of songs in every genre</h1>
      <section>
        {Object.keys(genreCount).map((genre) => {
          return (
            <div>
              <h1>
                {genre} :{genreCount[genre]}
              </h1>
            </div>
          );
        })}
      </section>
      <section>
        <h1>Total of songs & albums each artist has</h1>
        {artistNumbers}
      </section>
      <section>
        <h1>Total of songs each album has</h1>
        {albumNumbers}
      </section>
    </div>
  );
}

export default TotalStatistics;
