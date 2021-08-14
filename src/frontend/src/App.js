import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import TitlebarImageList from './components/TitlebarImageList';
import GlobalBar from './components/GlobalBar';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App-root">
      <Router>
        <GlobalBar />
        <Switch>
          <Route exact path="/">
            <TitlebarImageList />
          </Route>
          <Route path="/draw">
            <Canvas />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
