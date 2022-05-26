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
  writeBatch,
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

// Authentication
export const auth = getAuth();

export const onAuthState = (callback) => onAuthStateChanged(auth, callback);

export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutAuth = () => signOut(auth);

export const resetPasswordWithEmail = (email) =>
  sendPasswordResetEmail(auth, email);

// Firestore
export const db = getFirestore(app);

export const getDocRef = (param) => doc(collection(db, ...param));

export const updateDoc = (param, data) =>
  setDoc(doc(db, ...param), data, { merge: true });

export const addDoc = (param, data) => setDoc(doc(db, ...param), data);

export const getSnapshot = (param) => getDoc(doc(db, ...param));

export const getQuery = (param, order, sort) =>
  query(collection(db, ...param), orderBy(order, sort));

export const getCollection = async (query) => await getDocs(query);

export const listenCollection = (param, callback) =>
  onSnapshot(collection(db, ...param), callback);

export const removeDoc = (param) => deleteDoc(doc(db, ...param));

export const makeBatch = () => writeBatch(db);

export const updateBatch = (batch, param, data) =>
  batch.update(doc(db, ...param), data);

export const deleteBatch = (batch, param) => batch.delete(doc(db, ...param));

export const FirebaseTimestamp = Timestamp;

// Storage
export const storage = getStorage(app);

export const getImageRef = (fileName) => ref(storage, `images/${fileName}`);

export const uploadFile = (storageRef, file) => uploadBytes(storageRef, file);

export const downloadImageUrl = (fileName) =>
  getDownloadURL(ref(storage, `images/${fileName}`));

export const deleteImageFile = (fileName) =>
  deleteObject(ref(storage, `images/${fileName}`));

// export const functions = firebase.functions();
