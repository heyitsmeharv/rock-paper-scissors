import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainMenu from './pages/MainMenu';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import WaitingRoom from './pages/WaitingRoom';
import Game from './pages/Game';

const ENDPOINT = "https://rockpaperscissors-be.herokuapp.com/";
// const socket = io.connect(ENDPOINT);
const socket = io(ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function App() {
  // const [isConnected] = useState(socket?.connected);
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [player, setPlayer] = useState("");

  // useEffect(() => {
  //   socket.on("connection", data => {
  //     console.log(data);
  //   });
  // }, []);

  const setBlank = () => {
    setName("");
    setCode("");
  };

  const handleChange = (type, value) => {
    if (type) {
      type === 'name' ? setName(value) : setCode(value);
    };
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu socket={socket} />} />
        <Route path="/createRoom" element={<CreateRoom socket={socket} name={name} code={code} setRoomId={setRoomId} handleChange={handleChange} setBlank={setBlank} setPlayer={setPlayer} />} />
        <Route path="/joinRoom" element={<JoinRoom socket={socket} name={name} code={code} setRoomId={setRoomId} handleChange={handleChange} setBlank={setBlank} setPlayer={setPlayer} />} />
        <Route path="/waiting" element={<WaitingRoom socket={socket} name={name} code={code} roomId={roomId} player={player} />} />
        <Route path="/game" element={<Game socket={socket} roomId={roomId} player={player} />} />
      </Routes>
    </Router>
  );
}

export default App;
