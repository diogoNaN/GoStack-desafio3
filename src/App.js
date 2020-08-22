import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
    .then(response => setRepositories(response.data));
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      title: `Desafio ${Date.now()}`,
      url: "https://github.com/diogoNaN/GoStack-desafio3",
      techs: ["Node.js", "React JS"]
    })
    .then(response => setRepositories([...repositories, response.data]))
  };

  function handleRemoveRepository(id) {
    
    const actualizedRepositories = repositories.filter(repository => {
      if(repository.id !== id) {
        return repository
      }
    });

    api.delete(`/repositories/${id}`)
    .then(
      setRepositories(actualizedRepositories)
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
