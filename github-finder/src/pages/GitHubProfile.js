import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { getGitHubUserInformation } from '../services/service';
import { formatLastUpdatedDate } from '../helpers/formatters';

import RowComponent from '../components/Row';
import ColumnComponent from '../components/Column';

import TwitterIcon from '@mui/icons-material/Twitter';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkIcon from '@mui/icons-material/Link';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus(); 
  }, [username]);

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
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (username.trim() !== '') {
      navigate(`/profile?username=${username}`);
    }
    getGitHubUserInformation(username, setUserData, setError, setRepos);
  };

  const handleOpenWebsite = () => {
    if (userData && userData.blog) {
      const blogUrl = `https://${userData.blog}`;
      window.open(blogUrl, '_blank');
    }
  };

  const handleOpenTwitter = () => {
    if (userData && userData.twitter_username) {
      const twitterUrl = `https://twitter.com/${userData.twitter_username}`;
      window.open(twitterUrl, '_blank');
    }
  };

  

  const Wrapper = styled(ColumnComponent)`
  display: flex;
  align-items: center;
  margin: 112px;
  background-color: #fcfcfc;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 526px;
  height: 28px;
  border: 1px solid ${({ hasValue }) => (hasValue ? '#8c19d2' : '#e2e8f0')};
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 32px;
`;

const Button = styled.button`
  background-color: #9c19d2;
  color: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px 24px 10px 24px;
  cursor: pointer;
`

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Username = styled.p`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #A0AEC0;
  margin-top: 0px;

`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 1rem;
  margin-right: 16px;
`;

const RepositoryDescription = styled.p`
  margin-bottom: 0.5rem;
  color: #4a5568;
`;

const TitleBold = styled.p`
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 0px;
`
const TitleBoldClickable = styled.a`
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 0px;
  color: black;
  text-decoration: none;
`


const Title = styled.p`
  font-family: Nunito;
  font-size: 32px;
  font-weight: 500;
  line-height: 44px;
  letter-spacing: 0.01em;
  text-align: left;
  margin-right: 10px;
`;

const ProfileBio = styled.p`
  overflor: auto;
  color: #4a5568;
`;

const Separator = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #000;
`;

const Subtitle = styled.p`
  color: #4a5568;
`

  return (
    <Wrapper alignItems='start'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <RowComponent backgroundColor='white' marginBottom='80px'>
            <Link to="/home" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <RowComponent justifyContent='center' > 
                <Title style={{ color: '#0069ca' }}>Search</Title>
                <Title style={{ color: '#8c19d2', marginRight: '120px' }}>d_evs</Title>
              </RowComponent>
            </Link>
          <RowComponent alignItems='center'>
            <Input hasValue={username !== ''}  ref={inputRef} key={username} type="text" value={username} onChange={handleInputChange} placeholder="Search" />
            <Button type="submit">Buscar</Button>
          </RowComponent>
        </RowComponent> 
      </Form>
  
      {error && <ErrorMessage>{error}</ErrorMessage>}
  
      <RowComponent>
        {userData && (
          <ProfileContainer>
            <RowComponent backgroundColor='white' alignItems='center'> 
              <Avatar src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
                <ColumnComponent> 
                  <TitleBold>{userData.name}</TitleBold>
                  <Username>{`@${userData.login}`}</Username>
                </ColumnComponent>
            </RowComponent>
            <ColumnComponent width='200px'>
              {userData.bio && (
                <ProfileBio>{userData.bio}</ProfileBio>
              )}
              <RowComponent alignItems='center' marginBottom='-20px'>
                <GroupsIcon style={{marginRight:'10px'}}/>
                <Subtitle>{`${userData.followers} seguidores`}</Subtitle>
              </RowComponent>
              <RowComponent alignItems='center' marginBottom='-20px'>
                <FavoriteBorderIcon style={{marginRight:'10px'}}/>
                <Subtitle>{`${userData.following} seguindo`}</Subtitle>
              </RowComponent>
              {userData.company && (
                <RowComponent alignItems='center' marginBottom='-20px'>
                  <BusinessIcon style={{marginRight:'10px'}}/>
                  <Subtitle>{userData.company}</Subtitle>
                </RowComponent>
                )}
              {userData.location && (
              <RowComponent alignItems='center' marginBottom='-20px'>
                <LocationOnOutlinedIcon style={{marginRight:'10px'}}/>
                <Subtitle>{userData.location}</Subtitle>
              </RowComponent>
              )}
              {userData.email && (
                <RowComponent alignItems='center' marginBottom='-20px'>
                  <EmailOutlinedIcon style={{marginRight:'10px'}}/>
                  <Subtitle>{userData.email}</Subtitle>
                </RowComponent>                
              )}
              {userData.blog && (
                <RowComponent alignItems='center' marginBottom='-20px'>
                  <LinkIcon style={{marginRight:'10px'}}/>
                  <Subtitle onClick={handleOpenWebsite}>{userData.blog}</Subtitle>
                </RowComponent>
              )}
              {userData.twitter_username && (
                <RowComponent alignItems='center' marginBottom='20px'>
                  <TwitterIcon style={{marginRight:'10px'}}/>
                  <Subtitle onClick={handleOpenTwitter}>{`@${userData.twitter_username}`}</Subtitle>
                </RowComponent>
              )}
              <Button type="submit" width='100%'>Contato</Button>
            </ColumnComponent>
          </ProfileContainer>
        )}
            <ColumnComponent marginLeft='160px'>
              {repos.map((repo) => (
                <ColumnComponent key={repo.id} borderBottom='1px solid #e2e8f0' marginTop='12px'>
                  <TitleBoldClickable href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                  </TitleBoldClickable>
                  {repo.description && <RepositoryDescription>{repo.description}</RepositoryDescription>}
                  <RowComponent alignItems='center' width='230px' justifyContent='space-between'>
                    <StarBorderIcon/>
                    <Subtitle>{repo.stargazers_count}</Subtitle>
                    <Separator/>
                    <Subtitle>{formatLastUpdatedDate(repo.updated_at)}</Subtitle>
                  </RowComponent>
                </ColumnComponent>
              ))}
            </ColumnComponent>
      </RowComponent>
      
    </Wrapper>
  );
          
};

export default GitHubProfile;