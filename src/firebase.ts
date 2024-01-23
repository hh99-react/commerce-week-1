import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrsS5FqtX2m_98W7DZ6YP5g7tv7QPMlxg",
  authDomain: "hhreboot-commerce.firebaseapp.com",
  databaseURL:
    "https://hhreboot-commerce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hhreboot-commerce",
  storageBucket: "hhreboot-commerce.appspot.com",
  messagingSenderId: "1096065178959",
  appId: "1:1096065178959:web:717eb9f313341339f0b93a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getDatabase(app);
