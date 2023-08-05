// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeVmS2DtFaVuXsuZvd29KcwcNluzyo4ro",
  authDomain: "electricity-billing-syst-ff469.firebaseapp.com",
  projectId: "electricity-billing-syst-ff469",
  storageBucket: "electricity-billing-syst-ff469.appspot.com",
  messagingSenderId: "1036178214169",
  appId: "1:1036178214169:web:faf229d41a7dfa39584988",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app;
