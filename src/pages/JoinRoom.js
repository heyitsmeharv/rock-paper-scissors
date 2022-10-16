import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import styles from '../styles/pallette';

import { IoArrowBackOutline } from 'react-icons/io5';
import { MdDone } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import { SiSocketdotio } from 'react-icons/si';

const Background = styled.div.attrs(props => { })`
  width: 100%;
  height: 100vh;
  background: ${styles.darkBlue};
  display: flex;
`;

const Container = styled.div.attrs(props => { })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Flex = styled.div.attrs(props => { })`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonFlex = styled.div.attrs(props => { })`
  display: flex;
  align-items: center;
  place-content: center;
  width: 100%;
  margin-top: 5%;
`;

const Heading = styled.h1.attrs(props => { })`
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  @media only screen and (max-width: 500px) {
    font-size: 3rem;
  };
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

const BackButton = styled(IoArrowBackOutline)`
  color: #fff;
  font-size: 4rem;
  border: 2px solid ${styles.lightBlue};
  background: ${styles.blue};
  border-radius: 50%;
  margin: 0 5%;
  padding: 10px;
  :hover {
    color: ${styles.lightBlue};
    border: 2px solid ${styles.blue};
    background: ${styles.darkBlue};
    cursor: pointer;
  }

  @media only screen and (max-width: 500px) {
    font-size: 3rem;
  }
`;

const ConfirmButton = styled(MdDone)`
  color: #fff;
  font-size: 4rem;
  border: 2px solid ${styles.lightBlue};
  background: ${styles.blue};
  border-radius: 50%;
  margin: 0 5%;
  padding: 10px;
  :hover {
    color: ${styles.lightBlue};
    border: 2px solid ${styles.blue};
    background: ${styles.darkBlue};
    cursor: pointer;
  }

  @media only screen and (max-width: 500px) {
    font-size: 3rem;
  }

  ${props => props.disabled === false && css`
    color: #fff;
    background: ${styles.green}
  `}
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

const FixedContainer = styled.div.attrs(props => { })`
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: #fff;
  font-size: 1.5rem;
  margin-right: 10px;
`;

const JoinRoom = ({ socket, name, code, handleChange, setRoomId, setPlayer, setBlank }) => {
  let navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    socket.emit("getRooms", data => {
      console.log('data', data);
    });
  }, []);

  useEffect(() => {
    if (name !== "" && code !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, code]);

  const joinGame = () => {
    socket.emit("joinRoom", name, code);
    setRoomId(code);
    setBlank();
    setPlayer("playerTwo");
    navigate("/game", { replace: true });
  };

  console.log('name, code', { name, code })

  return (
    <Background className="background">
      <Container className="container">
        <Heading>Join Room</Heading>
        <Flex className="flex-container">
          <Input type="text" placeholder="name" value={name} onChange={e => handleChange('name', e.target.value)} />
          <Input type="text" placeholder="code" value={code} onChange={e => handleChange('code', e.target.value)} />
          <ButtonFlex>
            <BackButton onClick={() => navigate("/", { replace: true })} className="button" />
            <ConfirmButton disabled={isDisabled} onClick={() => !isDisabled && joinGame()} className="button" />
            {/* <Button onClick={() => navigate("/", { replace: true })} className="button">
              Back
            </Button>
            <Button onClick={() => joinGame()} className="button">
              Join
            </Button> */}
          </ButtonFlex>
        </Flex>
      </Container>
      <FixedContainer className="flex-container">
        made with <FaReact /> and <SiSocketdotio />
      </FixedContainer>
    </Background>
  );
};

export default JoinRoom;
