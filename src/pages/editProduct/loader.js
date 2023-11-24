import { supabase } from "../../supabase/client";

export const getProductByID = async({params}) => {
  const { product_id } = params;

  const { data, error } = await supabase
  .from('products')
  .select()
  .eq('id', product_id);
  
  if(error){
    console.log(error)
    return error;
  }

  return data;
}