import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import styles from '../styles/pallette';

const Background = styled.div.attrs(props => { })`
  width: 100%;
  height: 100vh;
  background: ${styles.darkBlue}
`;

const Heading = styled.h1.attrs(props => { })`
  font-size: 2rem;
  font-style: italic;
  font-weight: bold;
  color: #fff;
  padding: 12px 24px;
`;

const WaitingRoom = ({ socket, roomId }) => {
  let navigate = useNavigate();

  useEffect(() => {
    /* socket.emit("joinedRoom", name, code); */
  }, []);

  return (
    <Background className="background">
      <Heading className="heading">Room Id: {roomId}</Heading>
    </Background>
  );
};

export default WaitingRoom;
