import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

const auth = getAuth();

export const getUser = () => { // TODO zaminut fajerbejsom
  return {
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    imageUrl: "https://easydrawingguides.com/wp-content/uploads/2022/07/bull-head-_-face-11.png"
  }
}

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    localStorage.setItem("token", user.accessToken)
    localStorage.setItem("id", user.uid) // TODO obrisat
    localStorage.setItem("email", user.email) // TODO obrisat
    localStorage.setItem("name", user.displayName) // TODO obrisat
    return {user}
  } catch (error) {
    console.error(error)
    return {error}
  }
}

export const registerUser = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username
    })
    const user = userCredential.user
    localStorage.setItem("token", user.accessToken)
    localStorage.setItem("id", user.uid) // TODO obrisat
    localStorage.setItem("email", user.email) // TODO obrisat
    localStorage.setItem("name", user.displayName) // TODO obrisat
    return {user}
  } catch (error) {
    console.error(error)
    return {error}
  }
}

export const signOutUser = async () => {
  await signOut(auth)
  localStorage.removeItem("token")
}