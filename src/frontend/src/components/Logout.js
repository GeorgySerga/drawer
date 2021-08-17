import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useAuthContext } from '../providers/AuthProvider';

const Logout = () => {
  const { setUser } = useAuthContext();
  const logout = () => {
    setUser(null);
    localStorage.setItem('user', JSON.stringify(null));
  };
  return (
    <Button color="inherit" onClick={logout} component={Link} to="/">
      Logout
    </Button>
  );
};

export default Logout;
