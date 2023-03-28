import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = ({ baseUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const Navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        Navigate.push('/home');
      } else {
        throw new Error('Incorrect email or password');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <FormButton type="submit">Login</FormButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 16px;
`;

const FormInput = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const FormButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  background-color: #0077FF;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0059B3;
  }
`;

const ErrorMessage = styled.p`
  color: #FF0000;
  font-weight: bold;
  margin-top: 16px;
`;

export default Login;
