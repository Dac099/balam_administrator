import { createContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

export const UserContext = createContext();
export const UserContextProvider = ({children}) => {
  const [ userData, setUserData ] = useState();

  useEffect(() => {
    const fetchUserData = async() => {
      const { data, error } = await supabase.auth.getSession();
        if(!error){
          setUserData(data);
        }
      }
    fetchUserData();
  }, []);

  return(
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
}