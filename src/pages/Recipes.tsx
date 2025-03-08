import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, Clock, Users, Heart } from 'lucide-react';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder recipes data - replace with actual data from API
  const recipes = [
    {
      id: 1,
      title: "Vegan Chocolate Cake",
      description: "A rich and moist vegan chocolate cake that's perfect for any occasion.",
      image: "https://source.unsplash.com/random/800x600?chocolate+cake",
      prepTime: "20 mins",
      servings: 8,
      likes: 124,
      author: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Mediterranean Quinoa Bowl",
      description: "Fresh and healthy Mediterranean-style quinoa bowl with roasted vegetables.",
      image: "https://source.unsplash.com/random/800x600?quinoa+bowl",
      prepTime: "25 mins",
      servings: 4,
      likes: 98,
      author: "Michael Chen"
    },
    {
      id: 3,
      title: "Classic Margherita Pizza",
      description: "Traditional Italian pizza with fresh basil, mozzarella, and tomato sauce.",
      image: "https://source.unsplash.com/random/800x600?margherita+pizza",
      prepTime: "30 mins",
      servings: 6,
      likes: 156,
      author: "Laura Smith"
    },
    {
      id: 4,
      title: "Spicy Thai Green Curry",
      description: "Authentic Thai green curry with coconut milk and fresh vegetables.",
      image: "https://source.unsplash.com/random/800x600?thai+curry",
      prepTime: "35 mins",
      servings: 4,
      likes: 142,
      author: "David Wilson"
    },
    {
      id: 5,
      title: "Berry Smoothie Bowl",
      description: "Refreshing smoothie bowl packed with mixed berries and healthy toppings.",
      image: "https://source.unsplash.com/random/800x600?smoothie+bowl",
      prepTime: "10 mins",
      servings: 1,
      likes: 87,
      author: "Emma Davis"
    },
    {
      id: 6,
      title: "Homemade Sushi Rolls",
      description: "Fresh and delicious sushi rolls with avocado and cucumber.",
      image: "https://source.unsplash.com/random/800x600?sushi+rolls",
      prepTime: "45 mins",
      servings: 4,
      likes: 167,
      author: "Alex Kim"
    }
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white-100">
      {/* Hero Section */}
      <section className="pink_container">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-white" />
          </div>
          <h1 className="heading">
            Discover Amazing Recipes
          </h1>
          <p className="sub-heading">
            Explore a world of delicious recipes created by our community
          </p>
          
          {/* Search Bar */}
          <div className="search-form">
            <Search className="h-6 w-6 text-black-100" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="section_container">
        <div className="card_grid">
          {filteredRecipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="startup-card group">
              <div className="relative h-[200px] rounded-[10px] overflow-hidden mb-4 border-[3px] border-black">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <h3 className="text-20-medium mb-2">{recipe.title}</h3>
              <p className="startup-card_desc">{recipe.description}</p>
              
              <div className="flex items-center justify-between mt-4 mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-16-medium">{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-16-medium">{recipe.servings} servings</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t-2 border-black-100/10 pt-4 mt-4">
                <span className="text-16-medium text-black-100">By {recipe.author}</span>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-16-medium">{recipe.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recipes;