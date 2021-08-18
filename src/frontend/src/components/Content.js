import { Switch, Route } from 'react-router-dom';

import TitlebarImageList from './ImageList/TitlebarImageList';
import Canvas from './Canvas';
import Login from './Login';
import { useAuthContext } from '../providers/AuthProvider';

const Content = () => {
  const auth = useAuthContext();
  return (
    <Switch>
      <Route exact path="/">
        <TitlebarImageList />
      </Route>
      {auth.isAuthenticated() ? (
        <Route path="/draw">
          <Canvas />
        </Route>
      ) : (
        <Login />
      )}
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default Content;
