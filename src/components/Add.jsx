import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

const Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setError('');

    const data = { title, description };
    axios.post(`${process.env.REACT_APP_BASE_URL}/v1/content/skills`, data)
      .then((_response) => {
        setTitle('');
        setDescription('');
        alert('Skill added successfully!');
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        } else {
          setError('Something went wrong. Please try again later.');
        }
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleFormSubmit}>
          <FormTitle>Add a New Skill</FormTitle>
          <FormInput
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormInput
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormButton type="submit">Add Skill</FormButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 400px;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const FormButton = styled.button`
  padding: 10px;
  background-color: #0066cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export default Add;