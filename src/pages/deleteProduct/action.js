import { supabase } from "../../supabase/client";
import { redirect } from "react-router-dom";

export const deleteProduct = async({params}) => {

  const { data, error } = await supabase
  .from('products')
  .select('path_img')
  .eq('id', params.product_id);

  if(error) console.log(error);

  const { error: errorStorage } = await supabase
  .storage
  .from('products')
  .remove(data[0].path_img);

  if(errorStorage) console.log(errorStorage);

  const { error: errorDelete } = await supabase
  .from('products')
  .delete()
  .eq('id', params.product_id);

  if(errorDelete) console.log(errorDelete);

  window.location = '/';
  return redirect('/');
}