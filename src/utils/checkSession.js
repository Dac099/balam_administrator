import { supabase } from '../supabase/client';

export const isUserSignedIn = async() => {
  try {
    
    const { data: {user}, error } = await supabase.auth.getUser();
    
    if(user){
      return { isUserSignedIn: true, user}
    }

    return false;

  } catch (error) {
    console.log(error)
  }
}