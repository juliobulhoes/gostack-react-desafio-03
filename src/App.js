import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function getRepositories() {
      try {
        const response = await api.get("/repositories");

        setRepositories(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const formattedTechs = techs.split(" ");

      const data = {
        title,
        url,
        techs: formattedTechs,
      };

      const response = await api.post("/repositories", data);

      setRepositories([...repositories, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const removeRepository = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(removeRepository);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <form>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
        <input
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <input
          type="text"
          name="techs"
          onChange={(e) => setTechs(e.target.value)}
          placeholder="Tecnologias"
        />
        <button type="button" onClick={handleAddRepository}>
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default App;
