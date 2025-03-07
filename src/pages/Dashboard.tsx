import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Settings, Plus } from 'lucide-react';

const Dashboard = () => {
  // Placeholder data - replace with actual data from API
  const savedRecipes = [
    {
      id: 1,
      title: "Vegan Chocolate Cake",
      description: "A rich and moist vegan chocolate cake that's perfect for any occasion.",
      image: "https://addictedtodates.com/wp-content/uploads/2022/01/vegan-raspberry-chocolate-cake-500x375.jpg"
    },
    {
      id: 2,
      title: "Spicy Thai Curry",
      description: "Authentic Thai curry with a perfect balance of spices and coconut milk.",
      image: "https://source.unsplash.com/random/800x600?curry"
    },
    {
      id: 3,
      title: "Mediterranean Salad",
      description: "Fresh and healthy Mediterranean salad with feta cheese and olives.",
      image: "https://source.unsplash.com/random/800x600?salad"
    }
  ];

  return (
    <div className="min-h-screen bg-white-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <ChefHat className="h-10 w-10 text-primary" />
            <h1 className="text-30-bold">My Recipe Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <Link
              to="/create"
              className="startup-card_btn flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Recipe
            </Link>
            <button className="startup-card_btn flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>

        <div className="card_grid">
          {savedRecipes.map((recipe) => (
            <div key={recipe.id} className="startup-card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="startup-card_img mb-4"
              />
              <h3 className="text-20-medium mb-2">{recipe.title}</h3>
              <p className="startup-card_desc">{recipe.description}</p>
              <Link
                to={`/recipe/${recipe.id}`}
                className="startup-card_btn inline-block mt-4"
              >
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;