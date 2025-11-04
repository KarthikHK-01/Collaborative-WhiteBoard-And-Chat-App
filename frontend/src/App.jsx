import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import {Room} from './pages/Room';
import { RoomProvider } from './context/roomId';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/room" element={<RoomProvider><Room/></RoomProvider>}/>
        <Route path="/home" element={<RoomProvider><Home/></RoomProvider>}/>
      </Routes>
    </Router>
  )
}

export default App
