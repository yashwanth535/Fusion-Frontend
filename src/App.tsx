import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeInput from './pages/RecipeInput';
import RecipeOutput from './pages/RecipeOutput';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Recipes from './pages/Recipes';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={
              <AuthGuard>
                <RecipeInput />
              </AuthGuard>
            } />
            <Route path="/recipe/:id" element={<RecipeOutput />} />
            <Route path="/dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/recipes" element={
                <Recipes />
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;