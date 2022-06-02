import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import styles from '../styles/pallette';

import { FaReact } from 'react-icons/fa';
import { SiSocketdotio } from 'react-icons/si';

const Background = styled.div.attrs(props => { })`
  width: 100%;
  height: 100vh;
  background: ${styles.darkBlue}
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
  let navigate = useNavigate();

  return (
    <Background className="background">
      <FixedContainer className="flex-container">
        made with <FaReact /> and <SiSocketdotio />
      </FixedContainer>
    </Background >
  );
};

export default MainMenu;
