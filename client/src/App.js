import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainMenu from './pages/MainMenu';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import WaitingRoom from './pages/WaitingRoom';
import Game from './pages/Game';

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

function App() {
  const [isConnected] = useState(socket?.connected);
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.emit('connection');
  }, [isConnected]);

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
        <Route path="/" element={<MainMenu socket={socket} name={name} code={code} />} />
        <Route path="/createRoom" element={<CreateRoom socket={socket} name={name} code={code} setRoomId={setRoomId} handleChange={handleChange} setBlank={setBlank} />} />
        <Route path="/joinRoom" element={<JoinRoom socket={socket} name={name} code={code} setRoomId = { setRoomId } handleChange={handleChange} setBlank={setBlank} />} />
        <Route path="/waiting" element={<WaitingRoom socket={socket} name={name} code={code} roomId={roomId} />} />
        <Route path="/game" element={<Game socket={socket} roomId={roomId} />} />
      </Routes>
    </Router>
  );
}

export default App;
