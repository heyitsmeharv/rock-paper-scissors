import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

import styles from '../styles/pallette';

import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors, FaReact } from 'react-icons/fa';
import { SiSocketdotio } from 'react-icons/si';

const StyledRockIcon = styled(FaRegHandRock)`
  font-size: 4rem;
  color: ${styles.lightBlue}
`;

const StyledHandIcon = styled(FaRegHandPaper)`
  font-size: 4rem;
  color: ${styles.lightBlue}
`;

const StyledScissorsIcon = styled(FaRegHandScissors)`
  font-size: 4rem;
  color: ${styles.lightBlue}
`;

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
  align-items: center;
`;

const HeadingWrapper = styled.div.attrs(props => { })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 25%;
  margin: 25px;
`;

const Heading = styled.h1.attrs(props => { })`
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
`;

const Button = styled.button.attrs(props => { })`
  color: #fff;
  border: 2px solid ${styles.lightBlue};
  background: ${styles.blue};
  border-radius: 3px;
  width: 150px;
  height: 25px;
  margin: 0 15px;
  :hover {
    color: ${styles.lightBlue};
    border: 2px solid ${styles.blue};
    background: ${styles.darkBlue};
    cursor: pointer;
  }
`;

const FixedContainer = styled.div.attrs(props => { })`
  position: fixed;
  bottom: 0px;
  right: 0px;
  color: #fff;
  font-size: 1.5rem;
  margin-right: 10px;
`;

const MainMenu = () => {
  const ENDPOINT = "http://localhost:5000";
  const socket = io.connect(ENDPOINT);
  let navigate = useNavigate();

  useEffect(() => {
    socket.on("connection", data => {
      console.log(data);
    });
  }, []);

  return (
    <Background className="background">
      <Container className="container">
        <Flex className="flex-container">
          <HeadingWrapper className="heading-wrapper">
            <StyledRockIcon />
            <Heading className="heading">Rock</Heading>
          </HeadingWrapper>
          <HeadingWrapper className="heading-wrapper">
            <StyledHandIcon />
            <Heading className="heading">Paper</Heading>
          </HeadingWrapper>
          <HeadingWrapper className="heading-wrapper">
            <StyledScissorsIcon />
            <Heading className="heading">Scissors</Heading>
          </HeadingWrapper>
        </Flex>
        <Flex className="flex-container">
          <Button className="button">
            Create Room
          </Button>
          <Button onClick={() => navigate("rooms", { replace: true })} className="button">
            Join Room
          </Button>
        </Flex>
      </Container>
      <FixedContainer className="flex-container">
        made with <FaReact /> and <SiSocketdotio />
      </FixedContainer>
    </Background >
  );
};

export default MainMenu;
