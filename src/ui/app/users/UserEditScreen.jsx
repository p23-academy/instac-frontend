import {getUserById, saveUser} from "../../../data/firebase/firebaseDatabase.js";
import {Form, redirect, useLoaderData} from "react-router-dom";
import {getLoggedInUser} from "../../../data/firebase/firebaseAuth.js";
import FormInput from "../../../components/forms/FormInput.jsx";
import FormPasswordInput from "../../../components/forms/FormPasswordInput.jsx";
import Button from "../../../components/buttons/Buttton.jsx";
import {CircularProgress} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto.js";
import {useRef, useState} from "react";
import {uploadFile} from "../../../data/firebase/firebaseStorage.js";
import {setLoggedInUser} from "../../../data/store/authSlice.js";
import store from "../../../data/store/store.js";
import {setUser} from "../../../data/store/usersSlice.js";

export const userEditScreenLoader = async ({params}) => {
  const userId = params.userId
  if (userId !== getLoggedInUser().id) {
    return redirect('/app/home')
  }
  const user = await getUserById(userId)
  if (!user) {
    return redirect('/app/home')
  }
  return {user}
}

export const userEditScreenAction = async ({request}) => {
  const formData = await request.formData();
  const userId = formData.get("userId")
  const user = {
    id: userId,
    username: formData.get("username"),
    name: formData.get("name"),
    bio: formData.get("bio"),
    imageUrl: formData.get("imageUrl"),
  }
  store.dispatch(setUser(user))
  await saveUser(userId, user)
  return redirect(`/app/users/${userId}`)
}

const UserEditScreen = () => {
  const {user} = useLoaderData()

  const inputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [uploading, setUploading] = useState(false)

  const triggerFilePicker = () => {
    inputRef.current?.click()
  }

  const uploadFileLocal = async (event) => {
    setUploading(true)
    const files = event.target.files;
    if (!files.length) {
      return null
    }
    const file = files[0];
    const downloadUrl = await uploadFile(file)
    setUploading(false)
    setImageUrl(downloadUrl)
  }

  return (
    <div className={"h-full w-full flex flex-col items-center pt-16"}>
      <h1 className={"text-2xl font-bold mb-4"}>Minjaj podatke</h1>
      <div className={"w-8/12 flex gap-4"}>
        <Form className={"flex flex-col gap-2 basis-2/3"} method={"post"}>
          <input type={"hidden"} name={"imageUrl"} value={imageUrl}/>
          <input type={"hidden"} name={"userId"} value={user.id}/>
          <FormInput className={"w-full"} name="email" label="Email" type="email" initialValue={user.email} disabled/>
          <FormInput className={"w-full"} name="username" label="Korisničko ime" type="text" initialValue={user.username}/>
          <FormInput className={"w-full"} name="name" label="Ime" type="text" initialValue={user.name}/>
          <FormInput className={"w-full"} name="bio" label="Bio i osto" type="text" initialValue={user.bio}/>
          <Button className={"mt-4"} type={"submit"}>Snimi</Button>
        </Form>
        <div className={"basis-1/3"}>
          <button type={"button"} className={"w-full aspect-square"} onClick={triggerFilePicker}>
            <div className={"w-full h-full flex justify-center items-center bg-white border border-black rounded-full"}>
              {uploading ?
                <CircularProgress/>
                :
                imageUrl ?
                  <img className={"w-full h-full object-cover rounded-full"} src={imageUrl} alt=""/>
                  :
                  <AddAPhotoIcon className={"!size-32 text-blue-500"}/>
              }
            </div>
          </button>
          <input className={"hidden"} ref={inputRef} accept="image/*" onChange={uploadFileLocal} type={"file"}/>
        </div>
      </div>
    </div>

  )
}

export default UserEditScreen