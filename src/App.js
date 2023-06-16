import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import { fetchUsers } from './utils/apiUtils';
import SearchUserByCpf from './components/SearchUserByCpf';
import AddUser from './components/AddUser';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react';
import Home from './pages/Home';

function App() {

  const [user, setUser] = useState([]);

  /*useEffect(() => {
    fetchUsers().then((data) => console.log(data))
  }, [])*/

  const handleFetchUsers = () => {
    fetchUsers()
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message))
  }

  return (
    <div className="App">
      <Router>
        <Routes> 
          <Route exact path="/" element={<Home />} /> 
          {/*<Routr path="/buscar" element={<Buscar />} />*/}
          {/*<Routr path="/acompanhamento" element={<Buscar />} />*/}
          {/*<Routr path="/contato" element={<Buscar />} />*/}
          {/*<Routr path="/sobre" element={<Buscar />} />*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
