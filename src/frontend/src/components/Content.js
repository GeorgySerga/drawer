import { Switch, Route } from 'react-router-dom';

import TitlebarImageList from './ImageList/TitlebarImageList';
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
    <Route path="/login" component={Login} />
  </Switch>
);

export default Content;
