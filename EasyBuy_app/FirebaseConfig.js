import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABYgxTSe83CN-sg4drr6yWO11JCvMHog0",
  authDomain: "easybuy-1bebb.firebaseapp.com",
  projectId: "easybuy-1bebb",
  storageBucket: "easybuy-1bebb.appspot.com",
  messagingSenderId: "980692433103",
  appId: "1:980692433103:web:ae7e779e6282235e169fba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
