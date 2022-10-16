import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { motion } from 'framer-motion';

import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors, FaReact } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { SiSocketdotio } from 'react-icons/si';

import styles from '../styles/pallette';

const StyledRockIcon = styled(FaRegHandRock)`
  font-size: 8rem;
  color: ${styles.lightBlue};
  @media only screen and (max-width: 500px) {
    font-size: 4rem;
  };
`;

const StyledHandIcon = styled(FaRegHandPaper)`
  font-size: 8rem;
  color: ${styles.lightBlue};
  @media only screen and (max-width: 500px) {
    font-size: 4rem;
  };
`;

const StyledScissorsIcon = styled(FaRegHandScissors)`
  font-size: 8rem;
  color: ${styles.lightBlue};
  @media only screen and (max-width: 500px) {
    font-size: 4rem;
  };
`;

const Background = styled.div.attrs(props => { })`
  width: 100%;
  height: 100vh;
  background: ${styles.darkBlue};
`;

const Flex = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
`;

const InfoWrapper = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2%;
`;

const ScoreWrapper = styled.div.attrs(props => { })`
  display: flex;
  justify-content: center;
`;

const Selection = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 10%;
`;

const ScoreSelectionWrapper = styled.div.attrs(props => { })`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 10rem;

  @media only screen and (max-width: 500px) {
    margin-top: 5rem;
  };
`;

const Heading = styled.h1.attrs(props => { })`
  font-size: 3rem;
  font-style: italic;
  font-weight: bold;
  color: #fff;
  padding: 12px 24px;

  @media only screen and (max-width: 500px) {
    font-size: 2rem;
  };
`;

const IconWrapper = styled(motion.button)`
  border: 5px solid #fff;
  border-radius: 50%;
  padding: 30px;
  background: ${styles.darkBlue};

  @media only screen and (max-width: 500px) {
    padding: 15px;
  };

  ${props => props.selected && css`
    border: 8px solid ${styles.blue};
    background: ${styles.lightBlue};
    cursor: pointer;
    svg {
      color: #fff;
    }
  `};

  ${props => props.selected && props.status === 'win' && css`
    border: 8px solid #fff;
    background: ${styles.green};
    cursor: pointer;
    svg {
      color: #fff;
    }
  `};

  ${props => props.selected && props.status === 'lose' && css`
    border: 8px solid #fff;
    background: ${styles.red};
    cursor: pointer;
    svg {
      color: #fff;
    };
  `}

  ${props => props.selected && props.status === 'draw' && css`
    border: 8px solid #fff;
    background: ${styles.orange};
    cursor: pointer;
    svg {
      color: #fff;
    };
  `}
`;

const SelectionIcon = styled(motion.div)`
  ${props => props.status === 'win' && css`
    svg {
      color: ${styles.green};
    }
  `};

  ${props => props.status === 'lose' && css`
    svg {
      color: ${styles.red};
    }
  `}

  ${props => props.status === 'draw' && css`
    svg {
      color: ${styles.orange};
    }
  `};
`;

const OpponentSelectionIcon = styled(motion.div)`
  ${props => props.status === 'lose' && css`
    svg {
      color: ${styles.green};
    }
  `};

  ${props => props.status === 'win' && css`
    svg {
      color: ${styles.red};
    }
  `}

  ${props => props.status === 'draw' && css`
    svg {
      color: ${styles.orange};
    }
  `};
`;

const RedDot = styled.div.attrs(props => { })`
  height: 25px;
  width: 25px;
  background-color: ${styles.red};
  border-radius: 50%;
  display: inline-block;
`;

const GreenDot = styled.div.attrs(props => { })`
  height: 25px;
  width: 25px;
  background-color: ${styles.green};
  border-radius: 50%;
  display: inline-block;
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

const BackButton = styled(IoMdExit)`
  color: #fff;
  font-size: 3rem;
  border: 2px solid ${styles.lightBlue};
  background: ${styles.blue};
  border-radius: 50%;
  margin: 10px;
  padding: 10px;
  :hover {
    color: ${styles.lightBlue};
    border: 2px solid ${styles.blue};
    background: ${styles.darkBlue};
    cursor: pointer;
  }

  @media only screen and (max-width: 500px) {
    font-size: 2rem;
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

const Game = ({ socket, roomId, player }) => {
  let navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentOption, setOpponentOption] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [iconStatus, setIconStatus] = useState('');
  const [opponentConnection, setOpponentConnection] = useState(false);

  useEffect(() => {
    socket.on("disconnect", data => {
      console.log('data', data);
      setOpponentConnection(false);
    });

    socket.on("result", data => {
      console.log('data', data);
      setOpponentConnection(true);
      if (player === 'playerOne') {
        setScore(data.playerOneScore);
        setOpponentScore(data.playerTwoScore);
        setOpponentOption(data.playerTwoChoice);
        setIconStatus(data.winner === 'draw' ? 'draw' : data.winner === 'playerOneWins' ? 'win' : 'lose');
      } else {
        setScore(data.playerTwoScore);
        setOpponentScore(data.playerOneScore);
        setOpponentOption(data.playerOneChoice);
        setIconStatus(data.winner === 'draw' ? 'draw' : data.winner === 'playerTwoWins' ? 'win' : 'lose');
      }
    });
  }, []);

  const leaveRoom = () => {
    navigate("/", { replace: true });
  }

  const selectOption = option => {
    setSelectedOption('');
    setOpponentOption('');
    setIconStatus('');
    setSelectedOption(option);
    socket.emit("choiceSelected", roomId, option, socket.id);
  }

  return (
    <Background className="background">
      <Flex>
        <Heading className="heading">Room Id: {roomId}</Heading>
        <Flex>
          {/* <InfoWrapper>
            <Heading className="heading">Connected:</Heading>
            {opponentConnection ? <GreenDot /> : <RedDot />}
          </InfoWrapper> */}
          <BackButton onClick={() => leaveRoom()} className="button" />
        </Flex>
      </Flex>
      <ScoreSelectionWrapper>
        <ScoreWrapper>
          <Heading className="heading">You: {score}</Heading>
          <Heading className="heading">Opponent: {opponentScore}</Heading>
        </ScoreWrapper>
        <Selection>
          {selectedOption === 'rock' && (
            <Flex>
              <SelectionIcon
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                  }
                }}
                status={iconStatus}>
                <StyledRockIcon />
              </SelectionIcon>
              <Heading>VS</Heading>
              {opponentOption === '' && (
                <Spinner />
              )}
              {opponentOption === 'rock' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledRockIcon />
                </OpponentSelectionIcon>
              )}
              {opponentOption === 'paper' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledHandIcon />
                </OpponentSelectionIcon>
              )}
              {opponentOption === 'scissors' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledScissorsIcon />
                </OpponentSelectionIcon>
              )}
            </Flex>
          )}
          {selectedOption === 'paper' && (
            <Flex>
              <SelectionIcon
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                  }
                }}
                status={iconStatus}>
                <StyledHandIcon />
              </SelectionIcon>
              <Heading>VS</Heading>
              {opponentOption === '' && (
                <Spinner />
              )}
              {opponentOption === 'rock' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledRockIcon />
                </OpponentSelectionIcon>
              )}
              {opponentOption === 'paper' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledHandIcon />
                </OpponentSelectionIcon>
              )}
              {opponentOption === 'scissors' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledScissorsIcon />
                </OpponentSelectionIcon>
              )}
            </Flex>
          )}
          {selectedOption === 'scissors' && (
            <Flex>
              <SelectionIcon
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                  }
                }}
                status={iconStatus}>
                <StyledScissorsIcon />
              </SelectionIcon>
              <Heading>VS</Heading>
              {opponentOption === '' && (
                <Spinner />
              )}
              {opponentOption === 'rock' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledRockIcon />
                </OpponentSelectionIcon>
              )}
              {opponentOption === 'paper' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledHandIcon />
                </OpponentSelectionIcon>
              )}
              {opponentOption === 'scissors' && (
                <OpponentSelectionIcon
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    scale: {
                      type: "spring",
                      damping: 3,
                      restDelta: 0.01
                    }
                  }}
                  status={iconStatus}>
                  <StyledScissorsIcon />
                </OpponentSelectionIcon>
              )}
            </Flex>
          )}
        </Selection>
      </ScoreSelectionWrapper>
      <Container>
        <IconWrapper
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          status={iconStatus} selected={selectedOption === 'rock'} onClick={() => selectOption('rock')}>
          <StyledRockIcon />
        </IconWrapper>
      </Container>
      <Container>
        <IconWrapper
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          status={iconStatus} selected={selectedOption === 'paper'} onClick={() => selectOption('paper')}>
          <StyledHandIcon />
        </IconWrapper>
        <IconWrapper
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          status={iconStatus} selected={selectedOption === 'scissors'} onClick={() => selectOption('scissors')}>
          <StyledScissorsIcon />
        </IconWrapper>
      </Container>
      <FixedContainer className="flex-container">
        made with <FaReact /> and <SiSocketdotio />
      </FixedContainer>
    </Background>
  );
};

export default Game;
