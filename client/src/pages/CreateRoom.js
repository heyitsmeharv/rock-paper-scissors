import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import styles from '../styles/pallette';

const Background = styled.div.attrs(props => { })`
  width: 100%;
  height: 100vh;
  background: ${styles.darkBlue}
`;

const Container = styled.div.attrs(props => { })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Flex = styled.div.attrs(props => { })`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button.attrs(props => { })`
  color: #fff;
  border: 2px solid ${styles.lightBlue};
  background: ${styles.blue};
  border-radius: 3px;
  width: 150px;
  height: 25px;
  margin: 10px 15px;
  :hover {
    color: ${styles.lightBlue};
    border: 2px solid ${styles.blue};
    background: ${styles.darkBlue};
    cursor: pointer;
  }
`;

const Input = styled.input.attrs(props => { })`
  color: #fff;
  border: 2px solid ${styles.lightBlue};
  background: ${styles.blue};
  border-radius: 3px;
  width: 150px;
  height: 25px;
  margin: 10px 15px;
  :hover {
    color: ${styles.lightBlue};
    border: 2px solid ${styles.blue};
    background: ${styles.darkBlue};
    cursor: pointer;
  }
  ::placeholder {
    color: #fff;
    opacity: 1;
  }
`;

const CreateRoom = ({ socket, name, code, handleChange, setRoomId, setBlank }) => {
  let navigate = useNavigate();

  const createGame = () => {
    socket.emit("createRoom", name, code);
    socket.emit("joinRoom", name, code);
    setRoomId(code);
    setBlank();
    navigate("/waiting", { replace: true });
  };

  return (
    <Background className="background">
      <Container className="container">
        <Flex className="flex-container">
          <Input type="text" placeholder="name" value={name} onChange={e => handleChange('name', e.target.value)} />
          <Input type="text" placeholder="code" value={code} onChange={e => handleChange('code', e.target.value)} />
          <Flex>
            <Button onClick={() => navigate("/", { replace: true })} className="button">
              Back
            </Button>
            <Button onClick={() => createGame()} className="button">
              Create
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Background >
  );
};

export default CreateRoom;
