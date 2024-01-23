import {Component} from 'react';
import './global.css'
import Form from './Pages/CountryForm';
import Detail from './Pages/CountryDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/:country" element={<Detail />} />
        </Routes>
      </Router>
    );
  }
}

export default App;




