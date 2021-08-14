import './App.css';
import TitlebarImageList from './components/TitlebarImageList';
import GlobalBar from './components/GlobalBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App-root">
      <Router>
        <GlobalBar />
        <Switch>
          <Route exact path="/">
            <TitlebarImageList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
