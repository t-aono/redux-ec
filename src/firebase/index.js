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
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc,
  onSnapshot,
  refEqual,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
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

export const getDocRef = (param) => doc(collection(db, ...param));

export const saveDoc = (collectionName, id, data) =>
  setDoc(doc(db, collectionName, id), data, { merge: true });

export const saveSubCollection = (
  collectionName,
  id,
  subCollection,
  subId,
  data
) => setDoc(doc(db, collectionName, id, subCollection, subId), data);

export const getSnapshot = (collectionName, id) =>
  getDoc(doc(db, collectionName, id));

export const getQuery = (collectionName, order, sort) =>
  query(collection(db, collectionName), orderBy(order, sort));

export const getCollection = async (query) => await getDocs(query);

export const listenSubCollection = (
  collectionName,
  id,
  subCollection,
  callback
) => onSnapshot(collection(db, collectionName, id, subCollection), callback);

export const removeDoc = (collectionName, id) =>
  deleteDoc(doc(db, collectionName, id));

export const firebaseTimestamp = Timestamp;

export const storage = getStorage(app);

export const getImageRef = (fileName) => ref(storage, `images/${fileName}`);

export const uploadFile = (storageRef, file) => uploadBytes(storageRef, file);

export const downloadImageUrl = (fileName) =>
  getDownloadURL(ref(storage, `images/${fileName}`));

export const deleteImageFile = (fileName) =>
  deleteObject(ref(storage, `images/${fileName}`));

// export const functions = firebase.functions();
