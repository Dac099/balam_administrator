import { useImageStorage } from "./useImageStorage";
import { useState } from "react";
import { supabase } from "../supabase/client";

export const useProductTable = () => {
  const { uploadError, uploadImage } = useImageStorage();
  const [ productError, setProductError ] = useState(null);

  const uploadNewProduct = async(imageFile, name, price, description) => {
    const imageType = imageFile.type.split('/')[1];

    await uploadImage(imageFile, `images/${name}.${imageType}`, 'products');
    const { data:res } = supabase.storage.from('products').getPublicUrl(`images/${name}.${imageType}`);

    if(uploadError) console.log(uploadError);

    const { error } = await supabase
    .from('products')
    .insert({
      name, 
      description,
      price,
      url_img: res.publicUrl
    });

    if(error){
      setProductError(error.message);
    }
  }

  return { productError, uploadNewProduct }
}