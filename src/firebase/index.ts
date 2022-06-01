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
  where,
  OrderByDirection,
  WriteBatch,
  QuerySnapshot,
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

export const getDocRef = (path: string, segments: string[]) =>
  doc(collection(db, path, ...segments));

export const updateDoc = (path: string, segments: string[], data) =>
  setDoc(doc(db, path, ...segments), data, { merge: true });

export const addDoc = (path: string, segments: string[], data) =>
  setDoc(doc(db, path, ...segments), data);

export const getSnapshot = (path: string, segments: string[]) =>
  getDoc(doc(db, path, ...segments));

export const getQuery = (
  path: string,
  segments: string[],
  order: string,
  sort: OrderByDirection
) => query(collection(db, path, ...segments), orderBy(order, sort));

export const getFilterQuery = (
  path: string,
  segments: string[],
  order: string,
  sort: OrderByDirection,
  filter: string,
  value: string
) =>
  query(
    collection(db, path, ...segments),
    where(filter, "==", value),
    orderBy(order, sort)
  );

export const getCollection = async (query) => await getDocs(query);

export const listenCollection = (
  path: string,
  segments: string[],
  callback: (snapshot: QuerySnapshot) => void
) => onSnapshot(collection(db, path, ...segments), callback);

export const removeDoc = (path: string, segments: string[]) =>
  deleteDoc(doc(db, path, ...segments));

export const makeBatch = () => writeBatch(db);

export const updateBatch = (
  batch: WriteBatch,
  path: string,
  segments: string[],
  data
) => batch.update(doc(db, path, ...segments), data);

export const deleteBatch = (
  batch: WriteBatch,
  path: string,
  segments: string[]
) => batch.delete(doc(db, path, ...segments));

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
