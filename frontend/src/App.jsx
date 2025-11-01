import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from "./pages/SignUpPage.jsx"
import Sidebar from './components/Sidebar.jsx'
import RightPanel from './components/RightPanel.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

const App = () => {
  return (
    <div className="max-w-6xl mx-auto flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  );
}

export default App