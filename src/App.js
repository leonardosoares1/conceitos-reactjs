import React, { useState, useEffect } from "react";

import api from './services/api' 

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Unform',
      url: 'https://github.com/Rocketseat/unform',
      techs: ['ReactJS', 'React Native'],
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(item => item.id !== id))
    })
  }

  return (
    <div>
      <ul data-testid="repository-list" >
        {repositories.map(item => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
