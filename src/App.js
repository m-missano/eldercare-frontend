import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import { fetchUsers } from './utils/apiUtils';

function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => console.log(data))
  }, [])

  return (
    <div className="App">
      <p>Hello World</p>
    </div>
  );
}

export default App;
