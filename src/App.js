import React, { useState, useEffect } from "react";
import api from './services/api'


import "./styles.css";

function App() { 
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const repository = await api.post('repositories', {
      title: `New repository ${new Date()}`,
      owner: "Luan Alves",
      url: "www.github.com",
      techs: ["js","reactjs"]
    });
  

    setRepositories([...repositories, repository.data]);

  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`, id);
    //console.log(repositories[0].data);
    const newArr = repositories.filter(repositories => repositories.id !== id)

    setRepositories(newArr);
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
))}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
