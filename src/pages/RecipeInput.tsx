import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Loader2, Utensils, Clock, Users, Flame } from 'lucide-react';

const RecipeInput = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    wordCount: '500',
    cuisine: '',
    cookingTime: '',
    servings: '',
    difficulty: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call - replace with actual AI integration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/recipe/generated-123');
    }, 20000);
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="startup-form_label">
                Recipe Topic
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Vegan Chocolate Cake"
                  className="startup-form_input pl-12"
                  required
                />
                {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 flex-center rounded-full bg-primary-100">
                  <Utensils className="h-4 w-4 text-primary" />
                </div> */}
              </div>
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
                <div className="relative">
                  <input
                    type="text"
                    id="cookingTime"
                    value={formData.cookingTime}
                    onChange={(e) => setFormData({ ...formData, cookingTime: e.target.value })}
                    placeholder="e.g., 30 minutes"
                    className="startup-form_input pl-12"
                  />
                  {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 flex-center rounded-full bg-primary-100">
                    <Clock className="h-4 w-4 text-primary" />
                  </div> */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="servings" className="startup-form_label">
                  Servings
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="servings"
                    value={formData.servings}
                    onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                    placeholder="e.g., 4"
                    className="startup-form_input pl-12"
                    min="1"
                  />
                  {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 flex-center rounded-full bg-primary-100">
                    <Users className="h-4 w-4 text-primary" />
                  </div> */}
                </div>
              </div>

              <div>
                <label htmlFor="difficulty" className="startup-form_label">
                  Difficulty
                </label>
                <div className="relative">
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="startup-form_input pl-12"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 flex-center rounded-full bg-primary-100">
                    <Flame className="h-4 w-4 text-primary" />
                  </div> */}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="wordCount" className="startup-form_label">
                Recipe Detail Level
              </label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="wordCount500"
                    name="wordCount"
                    value="500"
                    checked={formData.wordCount === "500"}
                    onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                    className="h-4 w-4 border-2 border-black rounded-full focus:ring-primary"
                  />
                  <label htmlFor="wordCount500" className="ml-2 text-sm text-gray-700">
                    Brief (approx. 500 words)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="wordCount1000"
                    name="wordCount"
                    value="1000"
                    checked={formData.wordCount === "1000"}
                    onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                    className="h-4 w-4 border-2 border-black rounded-full focus:ring-primary"
                  />
                  <label htmlFor="wordCount1000" className="ml-2 text-sm text-gray-700">
                    Detailed (approx. 1000 words)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="wordCount1500"
                    name="wordCount"
                    value="1500"
                    checked={formData.wordCount === "1500"}
                    onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                    className="h-4 w-4 border-2 border-black rounded-full focus:ring-primary"
                  />
                  <label htmlFor="wordCount1500" className="ml-2 text-sm text-gray-700">
                    Comprehensive (approx. 1500 words)
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="startup-form_btn"
            >
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
        </div>
      </div>
    </div>
  );
};

export default RecipeInput;