import { Switch, Route } from 'react-router-dom';

import TitlebarImageList from './TitlebarImageList';
import Canvas from './Canvas';
import Login from './Login';

const Content = () => (
  <Switch>
    <Route exact path="/">
      <TitlebarImageList />
    </Route>
    <Route path="/draw">
      <Canvas />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </Switch>
);

export default Content;
