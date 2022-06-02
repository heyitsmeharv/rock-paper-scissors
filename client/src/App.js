import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainMenu from './pages/MainMenu';
import Rooms from './pages/Rooms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="rooms" element={<Rooms />} />
      </Routes>
    </Router>
  );
}

export default App;
