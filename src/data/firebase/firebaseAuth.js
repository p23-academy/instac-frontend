import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {saveUser} from "./firebaseDatabase.js";
import store from "../store/store.js";

const auth = getAuth();

export const getLoggedInUser = () => {
  const state = store.getState()
  return state.auth.user
}

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    localStorage.setItem("token", user.accessToken)
    return {user}
  } catch (error) {
    console.error(error)
    return {error}
  }
}

export const registerUser = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    const userData = {
      id: user.uid,
      email: email,
      username: username,
      imageUrl: "",
      name: "",
      bio: "",
    }
    await saveUser(user.uid, userData)
    localStorage.setItem("token", user.accessToken)
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