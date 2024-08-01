import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadFile = async (file) => {
  const userId = "konj"
  const fileRef = ref(storage, `/images/${userId}/${file.name}`);
  await uploadBytes(fileRef, file)
  const downloadUrl = await getDownloadURL(fileRef)
  return downloadUrl
}
