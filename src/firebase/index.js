import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const onAuthState = (callback) => onAuthStateChanged(auth, callback);
export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const signOutAuth = () => signOut(auth);
export const resetPasswordWithEmail = (email) =>
  sendPasswordResetEmail(auth, email);

export const db = getFirestore(app);
export const saveDoc = (collection, id, data) =>
  setDoc(doc(db, collection, id), data);
export const getSnapshot = (collection, id) => getDoc(doc(db, collection, id));
export const firebaseTimestamp = Timestamp;

// export const storage = firebase.storage();
// export const functions = firebase.functions();
