import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.configs";

export const uploadImage = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = ref(
      storage,
      `avatars/${Date.now()}-${Math.random().toString(36).substring(7)}`
    );
    await uploadBytes(fileRef, blob);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
