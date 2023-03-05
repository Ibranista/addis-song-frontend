import SongList from "../styles/SongStyles";
import { useEffect } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

function Home() {
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
