// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyAn9-3RMTPIJmEdGETfCcfKODzQl1NzNlE",
  authDomain: "tfgimages.firebaseapp.com",
  projectId: "tfgimages",
  storageBucket: "tfgimages.appspot.com",
  messagingSenderId: "239430632409",
  appId: "1:239430632409:web:cd3d856d75643ea56ecfc8",
  measurementId: "G-X4DZJL5Q92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export async function uploadAvatar(file, type) {
  const id = v4();
  const storageref = ref(storage, `${type}/${id}`);
  await uploadBytes(storageref, file);
  const url = await getDownloadURL(storageref);
  return url;
}
