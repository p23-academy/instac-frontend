import Button from "../../../components/buttons/Buttton.jsx";
import {useRef, useState} from "react";
import {uploadFile} from "../../../data/firebase/firebaseStorage.js";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {CircularProgress} from "@mui/material";
import {Form, redirect} from "react-router-dom";
import {postNewPost} from "../../../data/firebase/firebaseDatabase.js";

export const newPostAction = async ({request}) => {
  const formData = await request.formData()
  const post = {
    imageUrl: formData.get("imageUrl"),
    comment: formData.get("comment"),
  }
  await postNewPost(post)
  return redirect("/app/home")
}

const NewPostScreen = () => {
  const inputRef = useRef(null);

  const [imageUrl, setImageUrl] = useState("");
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
    <div className={"h-screen w-full flex justify-center items-center"}>
      <div className={"flex flex-col items-center gap-2 w-9/12"}>
        <button type={"button"} className={"w-1/2 h-96"} onClick={triggerFilePicker}>
          <div className={"w-full h-full flex justify-center items-center bg-white rounded-2xl"}>
            {uploading ?
              <CircularProgress/>
              :
              imageUrl ?
                <img className={"w-full h-full object-contain"} src={imageUrl} alt=""/>
                :
                <AddAPhotoIcon className={"!size-32 text-blue-500"}/>

            }
          </div>
        </button>
        <input className={"hidden"} ref={inputRef} accept="image/*" onChange={uploadFileLocal} type={"file"}/>
        <Form className={"w-full flex flex-col gap-2 items-center"} method={"post"}>
          <input type={"hidden"} name={"imageUrl"} value={imageUrl}/>
          <p className={"font-medium"}>Comment:</p>
          <textarea className={"resize-none w-96 h-24 p-2"} name={"comment"}/>
          <Button type={"submit"} className={"w-32"}>Post</Button>
        </Form>
      </div>
    </div>
  )
}

export default NewPostScreen;