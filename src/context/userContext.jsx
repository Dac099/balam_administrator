import { createContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const [ userData, setUserData ] = useState();

  return(
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
}