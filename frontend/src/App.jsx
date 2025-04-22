import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './components/Register';
import ChatList from './components/ChatList';
import Login from './components/Login';
import Conversation from './components/Conversation';
import Navbar from './components/Navbar';
import { useAuthentication } from './auth';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import ProtectedRoute from './components/AuthAccess';

const App = () => {
  const {isAuthenticated} = useAuthentication()
  const ProtectedLogin = () => {
    return isAuthenticated ? <Navigate to='/chats' /> : <AuthPage initialMethod='login' />
  }
  const ProtectedRegister = () => {
    return isAuthenticated ? <Navigate to='/chats' /> : <AuthPage initialMethod='register' />
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ProtectedLogin />}/>
        <Route path="/register" element={<ProtectedRegister />}/>
        <Route path="/chats" element={
        <ProtectedRoute>
            <ChatList />
        </ProtectedRoute>
        } />
        <Route path="/chat/:conversationId" element={<Conversation />} />
      </Routes>
    </Router>
  );
};

export default App;