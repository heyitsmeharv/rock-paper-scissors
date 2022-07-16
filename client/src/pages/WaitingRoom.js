import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import styles from '../styles/pallette';

import { SiSocketdotio } from 'react-icons/si';

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
`;

const Heading = styled.h1.attrs(props => { })`
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin: 15px;
`;

const SubHeading = styled.h2.attrs(props => { })`
  font-size: 2rem;
  font-style: italic;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin-bottom: 25px;
`;

const Loader = styled.div.attrs(props => { })`
  @keyframes rotate {
    100%   {transform: rotate(360deg)}
  };
  @keyframes prixClipFix {
    0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
    25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
    100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  };
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
  ::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #FFF;
    animation: prixClipFix 2s linear infinite;
  }
`;

const WaitingRoom = ({ socket, roomId }) => {
  let navigate = useNavigate();

  useEffect(() => {
    /* socket.emit("joinedRoom", name, code); */
  }, []);

  return (
    <Background className="background">
      <Container className="container">
        <Flex className="flex-container">
          <HeadingWrapper className="heading-wrapper">
            <Heading className="heading">Waiting for player to join...</Heading>
            <SubHeading>Please share the code '{roomId}' and wait for an opponent to connect.</SubHeading>
            <Loader />
          </HeadingWrapper>
        </Flex>
      </Container>
    </Background>
  );
};

export default WaitingRoom;
