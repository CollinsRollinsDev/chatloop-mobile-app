import React, { useContext, useEffect, useState } from 'react';

//comment: creating context for CSS...
const userContext = React.createContext();

// comment: function to use CSS...
export const useUser = () => {
  return useContext(userContext);
};

// comment: setting up CSS provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();


  const updateUser = (userDetails) => {
    setUser(userDetails);
  };

  return (
    <userContext.Provider value={{ user, updateUser }}>
      {children}
    </userContext.Provider>
  );
};