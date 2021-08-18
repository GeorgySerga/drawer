import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useAuthContext } from '../providers/AuthProvider';

const Logout = () => {
  const { setUser } = useAuthContext();
  const logout = () => {
    /**
     * Reset session on the react state.
     * Remove session from local storage.
     * Removed saved image from localstorage.
     * Invalidate the session.
     */
    setUser(null);
    localStorage.setItem('user', JSON.stringify(null));
    localStorage.removeItem('drawingHistory');
    fetch('/api/logout');
  };
  return (
    <Button color="inherit" onClick={logout} component={Link} to="/login">
      Logout
    </Button>
  );
};

export default Logout;
