import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGitHubUserInformation } from '../services/service';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');

    if (usernameParam) {
      setUsername(usernameParam);
    }
    getGitHubUserInformation(usernameParam, setUserData, setError, setRepos);
  }, [location.search]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    setError(null);

    getGitHubUserInformation(username, setUserData, setError, setRepos)
    
  };

  const handleOpenWebsite = () => {
    if (userData && userData.blog) {
      window.open(userData.blog, '_blank');
    }
  };

  const handleOpenTwitter = () => {
    if (userData && userData.twitter_username) {
      const twitterUrl = `https://twitter.com/${userData.twitter_username}`;
      window.open(twitterUrl, '_blank');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleInputChange} placeholder="Digite o nome de usuário do GitHub" />
        <button type="submit">Buscar</button>
      </form>

      {error && <p>{error}</p>}

      {userData && (
        <div>
          <h2>{userData.login}</h2>
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <p>Repositórios públicos: {userData.public_repos}</p>
          <h3>Repositórios:</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                <span> | Estrelas: {repo.stargazers_count}</span>
              </li>
            ))}
          </ul>
          {userData.blog && <button onClick={handleOpenWebsite}>Abrir site</button>}
          {userData.twitter_username && <button onClick={handleOpenTwitter}>Abrir perfil do Twitter</button>}
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
