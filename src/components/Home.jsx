import { useState, useEffect } from "react";
import styled from "styled-components";

function Home() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("https://autumn-delicate-wilderness.glitch.me/v1/content/skills")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSkills(data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <Navbar>
        <Logo>My App</Logo>
        <NavMenu>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/add">Add</NavLink>
          </NavItem>
        </NavMenu>
      </Navbar>
      <Container>
        {skills.length === 0 ? (
          <ErrorMessage>No skills found.</ErrorMessage>
        ) : (
          skills.map((skill) => (
            <Card key={skill.id}>
              <h2>{skill.title}</h2>
              <p>{skill.description}</p>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #eee;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
`;
export default Home;
