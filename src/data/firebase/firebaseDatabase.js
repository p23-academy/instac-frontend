import { getFirestore, collection, addDoc, getDocs  } from "firebase/firestore";

const db = getFirestore();

export const postNewPost = async (post) => {
  const postsRef = collection(db, "posts")
  await addDoc(postsRef, {
    ...post,
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
