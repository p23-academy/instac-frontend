import {addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where} from "firebase/firestore";
import {getLoggedInUser} from "./firebaseAuth.js";

const db = getFirestore();

export const saveUser = async (userId, user) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, user, {merge: true})
}

export const getUserById = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return {
      id: userSnap.id,
      ...userSnap.data(),
    }
  } else {
    return null
  }
}

export const postNewPost = async (post) => {
  const postsRef = collection(db, "posts")
  const loggedInUser = getLoggedInUser()
  await addDoc(postsRef, {
    ...post,
    author: loggedInUser,
    likesCount: 0,
    commentsCount: 0,
    date: new Date(),
  })
}

export const getPostsForHome = async () => {
  const postsRef = collection(db, "posts")
  const postsSnapshot = await getDocs(postsRef);
  const posts = postsSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
  }))
  return posts
}

export const getPostsByUser = async (userId) => {
  const postsRef = collection(db, "posts")
  const q = query(postsRef, where("author.id", "==", userId));
  const postsSnapshot = await getDocs(q);
  const posts = postsSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
  }))
  return posts
}
