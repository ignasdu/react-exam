import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
      username,
      email,
      password,
    })
      .then(() => {
        Navigate.push('/home');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Registration failed');
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Register</FormTitle>
        <FormInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <FormInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FormInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <FormInput type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <FormButton type="submit">Register</FormButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #f5f5f5;
  font-size: 16px;
`;

const FormButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

export default Register;