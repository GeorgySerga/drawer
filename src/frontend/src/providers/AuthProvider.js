import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      try {
        const user = JSON.parse(localUser);
        setUser(user);
      } catch (error) {
        console.error('Problem decoding local user', error);
      }
    }
  }, []);

  const providerValue = {
    user,
    isAuthenticated() {
      return !!this.user;
    },
    setUser,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
