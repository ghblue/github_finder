import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import RowComponent from '../components/Row/Row';
import ColumnComponent from '../components/Column/Column';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Manter o foco no input após cada atualização do estado
  }, [username]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
      navigate(`/profile?username=${username}`);
    }
  };

  const Wrapper = styled.div`
    display: flex;  
    align-items: center;
    justify-content: center;
    height: 100vh;
  `

  const Input = styled.input`

  width: 592px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 32px;
`

const Title = styled.h1`
text-align: left;
font-family: Nunito;
font-size: 80px;
font-weight: 500;
line-height: 109px;
letter-spacing: 0.01em;
margin-right: 32px
`

const Button = styled.button`
  background-color: #9c19d2;
  color: white;
  border: 1px solid #e2e8f0;

  width: 176px;
  left: 944px;
  top: 570px;
  border-radius: 6px;
  padding: 10px 24px 10px 24px;

`

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <ColumnComponent backgroundColor='white'>
          <RowComponent justifyContent='center'> 
            <Title style={{color: '#0069ca'}}>Search</Title>
            <Title style={{color: '#8c19d2'}}>d_evs</Title>
          </RowComponent>
          <RowComponent>
            <Input ref={inputRef} key={username} type="text" value={username} onChange={handleInputChange} placeholder="Search" />
            <Button type="submit">Buscar</Button>
          </RowComponent>
        </ColumnComponent>
      </form>
    </Wrapper>
  );


};

export default Home;
