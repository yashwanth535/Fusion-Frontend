import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Loader2 } from 'lucide-react';

const RecipeInput = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<'checking' | 'valid' | 'invalid'>('checking');
  const [formData, setFormData] = useState({
    topic: '',
    wordCount: '500',
    cuisine: '',
    cookingTime: '',
    servings: '',
    image: '',
    difficulty: 'medium',
  });
  const [error, setError] = useState('');

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTokenStatus('invalid');
    } else {
      setTokenStatus('valid');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in to generate a recipe.');
      setIsLoading(false);
      return;
    }

    try {
      // Check if the backend URL is properly defined
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      
      console.log(`Attempting to connect to: ${backendUrl}/api/v1/recipe/generate`);
      console.log('Auth token exists:', !!token);
      // Log only first few characters of token for debugging (be careful with sensitive info)
      if (token && token.length > 8) {
        console.log('Token format check:', `${token.substring(0, 4)}...${token.substring(token.length - 4)}`);
      }
      
      const response = await fetch(`${backendUrl}/api/v1/recipe/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(30000)
      });

      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token'); // Clear invalid token
        setTokenStatus('invalid');
        throw new Error('Your session has expired. Please log in again.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data);
      
      setIsLoading(false);
      navigate(`/recipe/generated-${Date.now()}`, { state: { recipe: data } });
    } catch (error) {
      console.error('Error generating recipe:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    // Redirect to login page
    navigate('/login', { state: { returnTo: '/create-recipe' } });
  };

  const programmingJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why did the AI chef quit? It couldn't handle too many recursive recipes!",
    "What's a chef's favorite programming language? Chocolate Chip!",
  ];

  const [currentJoke] = useState(
    programmingJokes[Math.floor(Math.random() * programmingJokes.length)]
  );

  return (
    <div className="min-h-screen bg-white-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="startup-form hover:shadow-xl">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex-center mx-auto mb-4">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-30-bold">Create Your Recipe</h1>
            <p className="text-16-medium text-black-100 mt-2">
              Let AI help you create a detailed recipe based on your ideas
            </p>
          </div>

          {/* Authentication check */}
          {tokenStatus === 'invalid' ? (
            <div className="mb-6 p-6 bg-yellow-50 border border-yellow-400 text-yellow-800 rounded-xl text-center">
              <p className="font-medium text-lg mb-3">Authentication Required</p>
              <p className="mb-4">You need to be logged in to generate recipes.</p>
              <button 
                onClick={handleLogin}
                className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
              >
                Log In
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  <p className="font-medium">Error: {error}</p>
                  {error.includes('401') && (
                    <button 
                      onClick={handleLogin} 
                      className="mt-2 text-red-800 font-medium underline"
                    >
                      Log in again
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="topic" className="startup-form_label">
                    Recipe Topic
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g., Vegan Chocolate Cake"
                    className="startup-form_input"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cuisine" className="startup-form_label">
                      Cuisine Type
                    </label>
                    <select
                      id="cuisine"
                      value={formData.cuisine}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                      className="startup-form_input"
                      required
                    >
                      <option value="" disabled>Select cuisine</option>
                      <option value="italian">Italian</option>
                      <option value="mexican">Mexican</option>
                      <option value="indian">Indian</option>
                      <option value="chinese">Chinese</option>
                      <option value="japanese">Japanese</option>
                      <option value="thai">Thai</option>
                      <option value="french">French</option>
                      <option value="mediterranean">Mediterranean</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cookingTime" className="startup-form_label">
                      Cooking Time
                    </label>
                    <input
                      type="text"
                      id="cookingTime"
                      value={formData.cookingTime}
                      onChange={(e) => setFormData({ ...formData, cookingTime: e.target.value })}
                      placeholder="e.g., 30 minutes"
                      className="startup-form_input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="servings" className="startup-form_label">
                      Servings
                    </label>
                    <input
                      type="number"
                      id="servings"
                      value={formData.servings}
                      onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                      placeholder="e.g., 4"
                      className="startup-form_input"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="difficulty" className="startup-form_label">
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="startup-form_input"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="topic" className="startup-form_label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="e.g., http://example.com/image.jpg"
                    className="startup-form_input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="wordCount" className="startup-form_label">
                    Recipe Detail Level
                  </label>
                  <div className="flex flex-col space-y-2">
                    {["500", "1000", "1500"].map((count) => (
                      <div key={count} className="flex items-center">
                        <input
                          type="radio"
                          id={`wordCount${count}`}
                          name="wordCount"
                          value={count}
                          checked={formData.wordCount === count}
                          onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                          className="h-4 w-4 border-2 border-black rounded-full focus:ring-primary"
                        />
                        <label htmlFor={`wordCount${count}`} className="ml-2 text-sm text-gray-700">
                          {count === "500" ? "Brief (500 words)" : count === "1000" ? "Detailed (1000 words)" : "Comprehensive (1500 words)"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="startup-form_btn">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                      Generating Recipe...
                    </>
                  ) : (
                    'Generate Recipe'
                  )}
                </button>
              </form>

              {isLoading && (
                <div className="mt-8 p-6 bg-primary-100 rounded-xl border-[3px] border-black">
                  <p className="text-16-medium text-center italic">
                    While we cook up your recipe, here's a joke to brighten your day:
                  </p>
                  <p className="text-20-medium text-center mt-4 font-semibold">
                    {currentJoke}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeInput;