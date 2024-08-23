import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

export const getUsersWithIds = async (userIds) => {
  const userRef = collection(db, "users");
  const q = query(userRef, where("id", "in", userIds))
  const usersSnapshot = await getDocs(q);
  const users = usersSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
  }))
  return users
}

export const getUsersForSuggested = async () => {
  const friends = await getAllFriends()
  friends.push(getLoggedInUser().id)
  console.log(friends)
  const userRef = collection(db, "users");
  const q = query(userRef, where("id", "not-in", friends))
  const usersSnapshot = await getDocs(q);
  const users = usersSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
  }))
  console.log(users)
  return users
}

export const postNewPost = async (post) => {
  const postsRef = collection(db, "posts")
  const loggedInUser = getLoggedInUser()
  await addDoc(postsRef, {
    ...post,
    author: loggedInUser.id,
    likes: [],
    likesCount: 0,
    commentsCount: 0,
    date: new Date(),
  })
}

export const getPostsForHome = async () => {
  const friends = await getAllFriends()
  friends.push(getLoggedInUser().id)
  const postsRef = collection(db, "posts")
  const q = query(postsRef, where("author", "in", friends))
  const postsSnapshot = await getDocs(q);
  const posts = postsSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
  }))
  return posts
}

export const getPostsForExplore = async () => {
  const postsRef = collection(db, "posts")
  const postsSnapshot = await getDocs(query(postsRef, orderBy("date", "desc"), limit(20)));
  const posts = postsSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
  }))
  return posts
}

export const getPostsByUser = async (userId) => {
  const postsRef = collection(db, "posts")
  const q = query(postsRef, where("author", "==", userId));
  const postsSnapshot = await getDocs(q);
  const posts = postsSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
  }))
  return posts
}

export const getPreviousChatsForUser = async () => {
  const loggedInUser = getLoggedInUser()
  const chatsRef = collection(db, "messages", loggedInUser.id)
  const chatsSnapshot = await getDocs(chatsRef);
  const chats = chatsSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
    ownChat: snapshot.data().author.id === loggedInUser.id,
  }))
  return chats
}

export const getMessagesByUser = async (userId) => {
  const loggedInUser = getLoggedInUser()
  const messagesRef = collection(db, "messages", loggedInUser.id, userId)
  const messagesSnapshot = await getDocs(messagesRef);
  const messages = messagesSnapshot.docs.map(snapshot => ({
    ...snapshot.data(),
    id: snapshot.id,
    ownMessage: snapshot.data().author.id === loggedInUser.id,
  }))
  return messages
}

export const likePost = async (postId) => {
  const postRef = doc(db, "posts", postId);
  const loggedUser = getLoggedInUser()
  await updateDoc(postRef, {
    likesCount: increment(1),
    likes: arrayUnion(loggedUser.id)
  });
}

export const unlikePost = async (postId) => {
  const postRef = doc(db, "posts", postId);
  const loggedUser = getLoggedInUser()
  await updateDoc(postRef, {
    likesCount: increment(-1),
    likes: arrayRemove(loggedUser.id)
  });
}

export const isPostAlreadyLiked = async (postId) => {
  const postRef = doc(db, "posts", postId);
  const loggedUser = getLoggedInUser()
  const postSnap = await getDoc(postRef)
  if (postSnap.exists()) {
    return postSnap.data().likes.includes(loggedUser.id)
  } else {
    return false
  }
}

export const getAllFriends = async () => {
  const loggedInUser = getLoggedInUser()
  const friendsRef = collection(db, "friends", loggedInUser.id, "friendsWith")
  const friendsSnapshot = await getDocs(friendsRef);
  const friends = friendsSnapshot.docs.map(snapshot => snapshot.id)
  return friends
}

export const isFriendsWithUser = async (userId) => {
  const loggedInUser = getLoggedInUser()
  const friendsRef = doc(db, "friends", loggedInUser.id, "friendsWith", userId)
  const friendsSnapshot = await getDoc(friendsRef);
  return friendsSnapshot.exists()
}

export const befriendUser = async (userId) => {
  const loggedInUser = getLoggedInUser()
  const friendsRef = doc(db, "friends", loggedInUser.id, "friendsWith", userId)
  await setDoc(friendsRef, {})
}

export const unfriendUser = async (userId) => {
  const loggedInUser = getLoggedInUser()
  const friendsRef = doc(db, "friends", loggedInUser.id, "friendsWith", userId)
  await deleteDoc(friendsRef)
}