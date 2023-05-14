export const getGitHubUserInformation = (username, setUserData, setError, setRepos) => {
    fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Usuário não encontrado');
      }
    })
    .then((data) => {
      setUserData(data);
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((reposData) => {
          const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
          setRepos(sortedRepos);
        })
        .catch((error) => {
          throw new Error('Erro ao buscar repositórios do usuário');
        });
    })
    .catch((error) => {
      setError(error.message);
    });

}
