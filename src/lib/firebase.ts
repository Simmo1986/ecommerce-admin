import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiie_WcoWSDTn7aK8PnGSftkK1IZqA1ZI",
  authDomain: "ecommerce-admin-62f1c.firebaseapp.com",
  projectId: "ecommerce-admin-62f1c",
  storageBucket: "ecommerce-admin-62f1c.firebasestorage.app",
  messagingSenderId: "848758010210",
  appId: "1:848758010210:web:72b39f81a233fe62273c3b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
