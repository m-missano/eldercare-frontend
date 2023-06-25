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
import PagePatient from './pages/PagePatient';
import { useCookies } from 'react-cookie';

function App() {

  const [cookies] = useCookies(['carerToken', 'patientToken', 'username'])
  const [user, setUser] = useState([]);

  return (
    <div className="App">
      <Router>
        <Routes>
          
           {/* Rotas para o Cuidador */}
           {cookies.carerToken && (
            <>
              <Route path="/acompanhamento" element={<FollowCaregiver />} />
              <Route path="/buscar" element={<Buscar />} />
              <Route path="/updater" element={<Updater />} />
              <Route path="/profile" element={<PageProfile />} />
              {/* Outras rotas específicas para o Cuidador */}
            </>
          )}
          
           {/* Rotas para o Paciente */}
           {cookies.patientToken && (
            <>
              <Route path="/acompanhamento" element={<FollowPatient />} />
              <Route path="/buscar" element={<Buscar />} />
              <Route path="/updater" element={<Updater />} />
              <Route path="/profile" element={<PagePatient />} />
              {/* Outras rotas específicas para o Paciente */}
            </>
          )}
          {/*<Route path="/contato" element={<Buscar />} />*/}
          
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buscar" element={<Login />} />
          <Route path="/updater" element={<Login />} />
          <Route path="/profile" element={<Login />} />
          <Route path="/acompanhamento" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
