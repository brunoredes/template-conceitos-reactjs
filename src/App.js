import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: 'Projeto ReactJS',
      url: 'https://github.com/brunoredes',
      techs: ['Tech 1', 'Tech 2'],
    });

    setRepositories([...repositories, res.data]);    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepos = repositories.filter(
      r => r.id !== id
    );

      setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => 
          <li key={r.id}>
            { r.title }

            <button onClick={() => handleRemoveRepository(r.id)}>Remover</button>
          </li>)
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
export default App;
