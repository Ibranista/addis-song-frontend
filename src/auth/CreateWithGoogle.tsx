import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as userSignOut,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-hot-toast";
import GoogleStyles from "../styles/GoogleStyles";
import { useNavigate } from "react-router-dom";
function CreateWithGoogle() {
  const [isClicked, setIsClicked] = useState(false);
const navigate = useNavigate()
  const SignInButton = () => {
    const GoogleButton = GoogleStyles();
    const signInWithGoogle = async () => {
      if (navigator.onLine) {
      try {
        const provider = new GoogleAuthProvider();
        setIsClicked(true);
        await signInWithPopup(auth, provider);
        if (auth.currentUser) {
          toast.success("successfully signed in!");
          navigate("/")
        }
      } catch (error: any) {
        setIsClicked(false);
        if (error.code === "auth/popup-closed-by-user") {
          toast.success("Operation cancelled");
        }
      }
      }
      else {
      toast.error("check your internet connection and try again!");
      setIsClicked(false);
      }
    };
    return (
      <GoogleButton>
        <button
          className="btn-google"
          onClick={signInWithGoogle}
          disabled={isClicked}
        >
          <img
            src="data:image/png;base64,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"
            width={40}
            height={35}
            alt="Google Logo"
          />
          Sign in with Google
        </button>
      </GoogleButton>
    );
  };
  const SignOut = () => {
    const signOut = async () => {
      try {
        setIsClicked(false);
        await userSignOut(auth);
      } catch (e: any) {
        toast.error(e.message);
      }
    };
    return (
      <button onClick={signOut} type="button">
        Sign Out
      </button>
    );
  };

  function SignInWithEmail() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const signInWithEmail = async (e: any) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        toast.success("signedin");
        navigate("/");
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
      <div className="d-flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Sign In With Email &amp; Password
        </h1>
        <form action="" className="max-w-md">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          />
          <label htmlFor="password" className="block mb-2 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            onClick={signInWithEmail}
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return {
    SignInButton,
    SignOut,
    SignInWithEmail,
  };
}

export default CreateWithGoogle;
