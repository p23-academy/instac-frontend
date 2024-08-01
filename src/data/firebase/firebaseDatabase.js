import { getFirestore, collection, addDoc, getDocs  } from "firebase/firestore";

const db = getFirestore();

export const postNewPost = async (post) => {
  const author = {
    name: "Bik",
    date: new Date(),
    imageUrl: "https://easydrawingguides.com/wp-content/uploads/2022/07/bull-head-_-face-11.png"
  }
  const postsRef = collection(db, "posts")
  await addDoc(postsRef, {
    ...post,
    author,
    likesCount: 0,
    commentsCount: 0,
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
