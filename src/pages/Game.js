import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

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

const Selection = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 10%;
`;

const Container = styled.div.attrs(props => { })`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50%;
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

const SelectionIcon = styled.div.attrs(props => { })`
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

const OpponentSelectionIcon = styled.div.attrs(props => { })`
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

const Game = ({ socket, roomId, player }) => {
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentOption, setOpponentOption] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [iconStatus, setIconStatus] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    socket.on("result", data => {
      console.log('data', data);
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

  const selectOption = option => {
    setSelectedOption('');
    setOpponentOption('');
    setIconStatus('');
    setSelectedOption(option);
    socket.emit("choiceSelected", roomId, option, socket.id);
  }

  return (
    <Background className="background">
      <Heading className="heading">Room Id: {roomId}</Heading>
      <Flex>
        <Heading className="heading">You: {score}</Heading>
        <Heading className="heading">Opponent: {opponentScore}</Heading>
      </Flex>
      <Selection>
        {selectedOption === 'rock' && (
          <Flex>
            <SelectionIcon status={iconStatus}>
              <StyledRockIcon />
            </SelectionIcon>
            <Heading>VS</Heading>
            {opponentOption === 'rock' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledRockIcon />
              </OpponentSelectionIcon>
            )}
            {opponentOption === 'paper' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledHandIcon />
              </OpponentSelectionIcon>
            )}
            {opponentOption === 'scissors' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledScissorsIcon />
              </OpponentSelectionIcon>
            )}
          </Flex>
        )}
        {selectedOption === 'paper' && (
          <Flex>
            <SelectionIcon status={iconStatus}>
              <StyledHandIcon />
            </SelectionIcon>
            <Heading>VS</Heading>
            {opponentOption === 'rock' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledRockIcon />
              </OpponentSelectionIcon>
            )}
            {opponentOption === 'paper' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledHandIcon />
              </OpponentSelectionIcon>
            )}
            {opponentOption === 'scissors' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledScissorsIcon />
              </OpponentSelectionIcon>
            )}
          </Flex>
        )}
        {selectedOption === 'scissors' && (
          <Flex>
            <SelectionIcon status={iconStatus}>
              <StyledScissorsIcon />
            </SelectionIcon>
            <Heading>VS</Heading>
            {opponentOption === 'rock' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledRockIcon />
              </OpponentSelectionIcon>
            )}
            {opponentOption === 'paper' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledHandIcon />
              </OpponentSelectionIcon>
            )}
            {opponentOption === 'scissors' && (
              <OpponentSelectionIcon status={iconStatus}>
                <StyledScissorsIcon />
              </OpponentSelectionIcon>
            )}
          </Flex>
        )}
      </Selection>
      <Container>
        <IconWrapper status={iconStatus} selected={selectedOption === 'rock'} onClick={() => selectOption('rock')}>
          <StyledRockIcon />
        </IconWrapper>
        <IconWrapper status={iconStatus} selected={selectedOption === 'paper'} onClick={() => selectOption('paper')}>
          <StyledHandIcon />
        </IconWrapper>
        <IconWrapper status={iconStatus} selected={selectedOption === 'scissors'} onClick={() => selectOption('scissors')}>
          <StyledScissorsIcon />
        </IconWrapper>
      </Container>
    </Background>
  );
};

export default Game;
