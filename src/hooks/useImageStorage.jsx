import { supabase } from "../supabase/client";
import { useState } from "react";

export const useImageStorage = () => {
  const [ uploadImageUlr, setUploadImageUrl ] = useState(null);
  const [ uploadError, setUploadError ] = useState(null);

  const uploadImage = async(file, path, bucket)  => {
    try {
      const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

      if(error){
        setUploadError(error.message);
      }else{
        setUploadImageUrl(data.path);
      }
    } catch (error) {
      setUploadError(error.message);
    }
  }

  return { uploadImage, uploadImageUlr, uploadError };
}