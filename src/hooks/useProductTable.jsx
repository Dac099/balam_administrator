import { useImageStorage } from "./useImageStorage";
import { useState } from "react";
import { supabase } from "../supabase/client";

export const useProductTable = () => {
  const { uploadError, uploadImage } = useImageStorage();
  const [ productError, setProductError ] = useState(null);

  const uploadNewProduct = async(imageFile, name, price, description) => {
    const res = await setAndUpImage(imageFile, name);

    if(uploadError) console.log(uploadError);

    const { error } = await supabase
    .from('products')
    .insert({
      name, 
      description,
      price,
      url_img: res.publicUrl,
      path_img: res.path
    });

    if(error){
      setProductError(error.message);
    }
  }

  const updateProduct = async(newProductData, id, name, imageFile) => {
    if(imageFile){
      const res = await setAndUpImage(imageFile, name);
      newProductData.url_img = res.publicUrl;
      newProductData.path = res.path;
      console.log(newProductData)
    }

    const { error } = await supabase
    .from('products')
    .update(newProductData)
    .eq('id', id);

    if(error) setProductError(error.message);
  }

  const setAndUpImage = async(file, name) => {
    const imageType = file.type.split('/')[1];
    const path = `images/${name}.${imageType}`;

    await uploadImage(file, path, 'products');
    const { data:res } = supabase.storage.from('products').getPublicUrl(path);

    return {publicUrl: res.publicUrl, path};
  }

  return { productError, uploadNewProduct, updateProduct }
}