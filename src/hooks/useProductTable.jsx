import { useImageStorage } from "./useImageStorage";
import { useState } from "react";
import { supabase } from "../supabase/client";

export const useProductTable = () => {
  const { uploadError, uploadImage } = useImageStorage();
  const [ productError, setProductError ] = useState(null);

  const uploadNewProduct = async(imageFile, name, price, description) => {
    const imageType = imageFile.type.split('/')[1];
    const path = `images/${name}.${imageType}`;

    await uploadImage(imageFile, path, 'products');
    const { data:res } = supabase.storage.from('products').getPublicUrl(path);

    if(uploadError) console.log(uploadError);

    const { error } = await supabase
    .from('products')
    .insert({
      name, 
      description,
      price,
      url_img: res.publicUrl,
      path_img: path
    });

    if(error){
      setProductError(error.message);
    }
  }

  return { productError, uploadNewProduct }
}