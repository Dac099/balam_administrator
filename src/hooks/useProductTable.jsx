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

  const updateProduct = async(productData, productID, prevName, prevURL ,imageFile, productPath) => {
    // Si se actualiza la imágen, hay que cambiar el campo url_img con la nueva URL
    if(productData.name){
      // Si se actualiza el nombre, hay que cambiar el nombre del archivo en storage, el campo path, y el campo url_img
      const { publicUrl, path } = await updatePathImage(prevName, prevURL, productData.name);
      productData.url_img = publicUrl;
      productData.path_img = path;
    }

    if(imageFile){
      // const { data: deleteRes, error: deleteError } = await supabase
      // .storage
      // .from('products')
      // .remove([productPath]);

      const { data: uploadRes, error: uploadError} = await supabase
      .storage
      .from('products')
      .upload(productPath, imageFile, {
        cacheControl: 0,
        upsert: true
      });


      console.log(uploadRes, uploadError)

      const { data: {publicUrl} } = supabase.storage.from('products').getPublicUrl(productPath);

      console.log(publicUrl)

      productData.url_img = publicUrl;
    }

    const { error: updateError } = await supabase
    .from('products')
    .update(productData)
    .eq('id', productID);

    if(updateError) console.log(updateError);
  }

  const updatePathImage = async(prevName, prevURL, newName) => {
    const fileType = prevURL.split('.')[3];

    //For update the path of an image: the prev image needs to be copied with the new path name and the previous image need to be removed

    const { error: onCopyError } = await supabase
    .storage
    .from('products')
    .copy(`images/${prevName}.${fileType}`, `images/${newName}.${fileType}`);
    
    if(onCopyError) console.log(onCopyError);

    const { data: {publicUrl} } = supabase
    .storage.from('products')
    .getPublicUrl(`images/${newName}.${fileType}`);

    const { error: onDeleteError } = await supabase
    .storage
    .from('products')
    .remove([`images/${prevName}.${fileType}`]);

    if(onDeleteError) console.log(onDeleteError);

    return {publicUrl, path: `images/${newName}.${fileType}`};
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