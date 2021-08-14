import { Switch, Route } from 'react-router-dom';

import TitlebarImageList from './TitlebarImageList';
import Canvas from './Canvas';

const Content = () => (
  <Switch>
    <Route exact path="/">
      <TitlebarImageList />
    </Route>
    <Route path="/draw">
      <Canvas />
    </Route>
  </Switch>
);

export default Content;
