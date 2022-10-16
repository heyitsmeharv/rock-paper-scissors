import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import styles from '../styles/pallette';

import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors, FaReact } from 'react-icons/fa';
import { IoCreateOutline } from 'react-icons/io5'
import { MdConnectWithoutContact } from 'react-icons/md'
import { SiSocketdotio } from 'react-icons/si';

const StyledRockIcon = styled(FaRegHandRock)`
  font-size: 8rem;
  color: ${styles.lightBlue};
  @media only screen and (max-width: 500px) {
    font-size: 3rem;
  };
`;

const StyledHandIcon = styled(FaRegHandPaper)`
  font-size: 8rem;
  color: ${styles.lightBlue};
  @media only screen and (max-width: 500px) {
    font-size: 3rem;
  };
`;

const StyledScissorsIcon = styled(FaRegHandScissors)`
  font-size: 8rem;
  color: ${styles.lightBlue};
  @media only screen and (max-width: 500px) {
    font-size: 3rem;
  };
`;

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
  align-items: center;
  margin-top: 4rem;
  place-content: center;
  width: 100%;
  /* @media only screen and (max-width: 500px) {
    font-size: 100%;
  }; */
`;

const HeadingWrapper = styled.div.attrs(props => { })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 33%;
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
  margin: 0 15px;
  :hover {
    color: ${styles.lightBlue};
    border: 2px solid ${styles.blue};
    background: ${styles.darkBlue};
    cursor: pointer;
  }
`;

const CreateButton = styled(IoCreateOutline)`
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

const JoinButton = styled(MdConnectWithoutContact)`
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

const FixedContainer = styled.div.attrs(props => { })`
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: #fff;
  font-size: 1.5rem;
  margin-right: 10px;
`;

const Spinner = styled.div.attrs(props => { })`
  border: 8px solid ${styles.lightBlue};
  border-top: 8px #fff solid;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 500px) {
    height: 25px;
    width: 25px;
  };
`;

const MainMenu = ({ socket, isConnected }) => {
  /* const [isConnected, setIsConnected] = useState(false); */
  let navigate = useNavigate();

  /* useEffect(() => {
    if (!isConnected) {
      socket.on("connection", data => {
        console.log(data);
        setIsConnected(true)
      });
    }
  }, [socket]); */

  const joinGame = () => {
    navigate("/joinRoom", { replace: true });
  };

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
          {isConnected ? (
            <>
              <CreateButton onClick={() => navigate("createRoom", { replace: true })} className="button" />
              <JoinButton onClick={() => joinGame()} className="button" />
              {/* <Button onClick={() => navigate("createRoom", { replace: true })} className="button">
                Create Room
              </Button>
              <Button onClick={() => joinGame()} className="button">
                Join Room
              </Button> */}
            </>
          ) : (
            <Spinner />
          )}
        </Flex>
      </Container>
      <FixedContainer className="flex-container">
        made with <FaReact /> and <SiSocketdotio />
      </FixedContainer>
    </Background>
  );
};

export default MainMenu;
