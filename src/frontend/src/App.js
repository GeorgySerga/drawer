import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import GlobalBar from './components/GlobalBar';
import Content from './components/Content';

function App() {
  return (
    <div className="App-root">
      <Router>
        <GlobalBar />
        <Content />
      </Router>
    </div>
  );
}

export default App;
