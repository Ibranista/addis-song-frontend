import SongList from "../styles/SongStyles";
function Home() {
  return (
    <>
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
        Explore songs below
      </h1>
      <SongList />
    </>
  );
}

export default Home;
