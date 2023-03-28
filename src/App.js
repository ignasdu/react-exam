import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Register = React.lazy(() => import('./components/Register'));
const Home = React.lazy(() => import('./components/Home'));
const Add = React.lazy(() => import('./components/Add'));
const Login = React.lazy(() => import('./components/Login'));

function App() {
  return (
    <Router>
      <MainContainer>
        <Title>Webpage</Title>
        <Routes>
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/login" component={Login} />
        </Routes>
      </MainContainer>
    </Router>
  );
}


const MainContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

export default App;
