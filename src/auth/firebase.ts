import { initializeApp, getApp, FirebaseOptions } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB1IDlEvJFmlEyBgKJ8eCyAkwQVhUNXrS8",
  authDomain: "addis-songs.firebaseapp.com",
  projectId: "addis-songs",
  storageBucket: "addis-songs.appspot.com",
  messagingSenderId: "586690396592",
  appId: "1:586690396592:web:4a3ca3ff067ff323c05675",
  measurementId: "G-SPFMJXFEPK",
};

// Initialize Firebase
function createFirebaseApp(firebaseConfig: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
  }
}
const app = createFirebaseApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
