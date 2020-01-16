import React, { useEffect, useState } from 'react';
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    getDevs();
  }, []);

  async function getDevs() {
    try {
      const response = await api.get('/devs');
      setDevs(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function addDev(data) {
    await api.post('/devs', data)
      .then(response => {
        setDevs([...devs, response.data])
        
      })
      .catch(error => console.log(error))


  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={addDev} />
      </aside>
      <main>
        <ul>
          {
            devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
