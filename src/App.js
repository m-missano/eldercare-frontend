import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import { fetchUsers } from './utils/apiUtils';
import SearchUserByCpf from './components/SearchUserByCpf';
import AddUser from './components/AddUser';

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
      <button onClick={handleFetchUsers}>SEARCH USERS</button>
      <SearchUserByCpf />
      <AddUser />
    </div>
  );
}

export default App;
