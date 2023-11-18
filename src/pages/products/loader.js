import { supabase } from "../../supabase/client.js";


export const getProducts = async() => {
  const { data, error } = await supabase
  .from('products')
  .select();

  if(!error){
    return data;
  }

  throw new Error(error.message);
}