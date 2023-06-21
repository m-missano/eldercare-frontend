import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchUsers } from './utils/apiUtils';
import SearchUserByCpf from './components/SearchUserByCpf';
import AddUser from './components/AddUser';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Buscar from './pages/Search';
import Updater from './pages/Updater';
import PageProfile from './pages/PageProfile';
import Follow from './pages/Follow';

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
          <Route path="/" element={<Home />} /> 
          <Route exact path="/login" element={<Login />} /> 
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/updater" element={<Updater />} />
          <Route path="/profile" element={<PageProfile/>} />
          <Route path="/acompanhamento" element={<Follow />} />
          {/*<Route path="/contato" element={<Buscar />} />*/}
          {<Route path="/sobre" element={<About/>} />}
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
