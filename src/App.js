import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchAuthorization, fetchUserByUsername, fetchUsers } from './utils/apiUtils';
import SearchUserByCpf from './components/SearchUserByCpf';
import AddUser from './components/AddUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Buscar from './pages/Search';
import Updater from './pages/Updater';
import PageProfile from './pages/PageProfile';
import FollowCaregiver from './pages/FollowCaregiver';
import FollowPatient from './pages/FollowPatient';
import { useCookies } from 'react-cookie';

function App() {

  const [cookies] = useCookies(['cuidadorToken', 'patientToken', 'username'])
  const [user, setUser] = useState([]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />

           {/* Rotas para o Cuidador */}
           {cookies.cuidadorToken && (
            <>
              <Route path="/acompanhamento" element={<FollowCaregiver />} />
              {/* Outras rotas específicas para o Cuidador */}
            </>
          )}
          
           {/* Rotas para o Paciente */}
           {cookies.patientToken && (
            <>
              <Route path="/acompanhamento" element={<FollowPatient />} />
              {/* Outras rotas específicas para o Paciente */}
            </>
          )}
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/updater" element={<Updater />} />
          <Route path="/profile" element={<PageProfile />} />
          {/*<Route path="/contato" element={<Buscar />} />*/}
          {<Route path="/sobre" element={<About />} />}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
