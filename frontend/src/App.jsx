import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import {Room} from './pages/Room';
import { UserProvider } from './context/user';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return(
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/room" element={<ProtectedRoute><Room/></ProtectedRoute>}/>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
