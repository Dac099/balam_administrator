import { supabase } from "../../supabase/client";
import { redirect } from "react-router-dom";

export const deleteProduct = async({params}) => {

  const { data, error } = await supabase
  .from('products')
  .select('url_img')
  .eq('id', params.product_id);

  if(error) console.log(error);

  const image_path = data[0].url_img.split('products')[1].split('%20').join(' ');
  const { data: resStorage,error: errorStorage } = await supabase
  .storage
  .from('products')
  .remove([image_path]);

  if(errorStorage) console.log(errorStorage);

  const { error: errorDelete } = await supabase
  .from('products')
  .delete()
  .eq('id', params.product_id);

  if(errorDelete) console.log(errorDelete);

  return redirect('/');
}