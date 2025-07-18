import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeInput from './pages/RecipeInput';
import RecipeOutput from './pages/RecipeOutput';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Recipes from './pages/Recipes';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import RecipeView from './pages/RecipeView';
import BackendCheck from './components/ui/backendCheck'
import Refund from './pages/Refund';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white-100 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={
                <AuthGuard>
                  <RecipeInput />
                </AuthGuard>
              } />
              <Route path="/recipe/:id" element={<RecipeOutput />} />
              <Route path="recipe/view/:id" element={<RecipeView />} />
              <Route path="/dashboard" element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/backend" element={<BackendCheck/>}/>
              <Route path="/refund" element={<Refund />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;