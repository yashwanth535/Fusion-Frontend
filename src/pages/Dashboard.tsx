import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Plus, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RecipeCard, { Recipe, RecipeCardSkeleton } from '../components/RecipeCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user recipes
    // Replace with actual API call in production
    setTimeout(() => {
      setRecipes([
        {
          _id: "1",
          title: "Vegan Chocolate Cake",
          description: "A rich and moist vegan chocolate cake that's perfect for any occasion.",
          image: "https://addictedtodates.com/wp-content/uploads/2022/01/vegan-raspberry-chocolate-cake-500x375.jpg",
          category: "Dessert",
          views: 120,
          _createdAt: new Date().toISOString(),
          author: user ? {
            _id: user._id,
            name: user.name,
            image: "https://ui-avatars.com/api/?name=" + user.name
          } : undefined
        },
        {
          _id: "2",
          title: "Spicy Thai Curry",
          description: "Authentic Thai curry with a perfect balance of spices and coconut milk.",
          image: "https://source.unsplash.com/random/800x600?curry",
          category: "Main Course",
          views: 85,
          _createdAt: new Date().toISOString(),
          author: user ? {
            _id: user._id,
            name: user.name,
            image: "https://ui-avatars.com/api/?name=" + user.name
          } : undefined
        },
        {
          _id: "3",
          title: "Mediterranean Salad",
          description: "Fresh and healthy Mediterranean salad with feta cheese and olives.",
          image: "https://source.unsplash.com/random/800x600?salad",
          category: "Salad",
          views: 64,
          _createdAt: new Date().toISOString(),
          author: user ? {
            _id: user._id,
            name: user.name,
            image: "https://ui-avatars.com/api/?name=" + user.name
          } : undefined
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-20-medium">Please log in to view your dashboard</p>
      </div>
    );
  }

  return (
    <>
      <section className="profile_container max-w-7xl mx-auto px-4 py-12">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <img
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user.email.split('@')[0]}
          </p>
          <p className="mt-1 text-center text-14-normal">
            Passionate food enthusiast and recipe creator
          </p>
          
          <div className="flex gap-4 mt-6 justify-center">
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

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">Your Recipes</p>
          
          {loading ? (
            <ul className="card_grid-sm">
              <RecipeCardSkeleton />
            </ul>
          ) : (
            <ul className="card_grid-sm">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;