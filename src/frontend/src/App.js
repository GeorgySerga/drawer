import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import GlobalBar from './components/GlobalBar';
import Content from './components/Content';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <div className="App-root">
      <AuthProvider>
        <Router>
          <GlobalBar />
          <Content />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
