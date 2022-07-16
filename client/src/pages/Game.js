import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from 'react-icons/fa';

import styles from '../styles/pallette';

const StyledRockIcon = styled(FaRegHandRock)`
  font-size: 8rem;
  color: ${styles.lightBlue};
`;

const StyledHandIcon = styled(FaRegHandPaper)`
  font-size: 8rem;
  color: ${styles.lightBlue};
`;

const StyledScissorsIcon = styled(FaRegHandScissors)`
  font-size: 8rem;
  color: ${styles.lightBlue};
`;

const Background = styled.div.attrs(props => { })`
  width: 100%;
  height: 100vh;
  background: ${styles.darkBlue}
`;

const Flex = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
`;

const Heading = styled.h1.attrs(props => { })`
  font-size: 2rem;
  font-style: italic;
  font-weight: bold;
  color: #fff;
  padding: 12px 24px;
`;

const IconWrapper = styled.button.attrs(props => { })`
  border: 5px solid #fff;
  border-radius: 50%;
  padding: 30px;
  background: ${styles.darkBlue};
  :hover {
    border: 8px solid ${styles.blue};
    background: ${styles.lightBlue};
    cursor: pointer;
    svg {
      color: #fff;
    }
  }
`;

const Game = ({ socket, roomId }) => {
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    socket.on("result", (...args) => {
      console.log('args', args);
    });
  }, []);

  return (
    <Background className="background">
      <Heading className="heading">Room Id: {roomId}</Heading>
      <Flex>
        <Heading className="heading">You: {score}</Heading>
        <Heading className="heading">Opponent: {opponentScore}</Heading>
      </Flex>
      <Container>
        <IconWrapper onClick={() => socket.emit("choiceSelected", roomId, 'rock', socket.id)}>
          <StyledRockIcon />
        </IconWrapper>
        <IconWrapper onClick={() => socket.emit("choiceSelected", roomId, 'paper', socket.id)}>
          <StyledHandIcon />
        </IconWrapper>
        <IconWrapper onClick={() => socket.emit("choiceSelected", roomId, 'scissors', socket.id)}>
          <StyledScissorsIcon />
        </IconWrapper>
      </Container>
    </Background>
  );
};

export default Game;
