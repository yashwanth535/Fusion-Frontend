import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChefHat, Clock, Users, Heart, Utensils, Search, Timer, Globe, Siren as Fire } from 'lucide-react';

interface CategoryStats {
  category: string;
  count: number;
}

interface Recipe {
  _id: string;
  title: string;
  description: string;
  imageURL: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  uploadedBy: string;
}

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // Keep the original categories with their images and icons
  const categories = [
    { 
      name: "Breakfast",
      icon: <Timer className="h-8 w-8" />,
      image: "./Breakfast.png",
      description: "Start your day right"
    },
    { 
      name: "Main Course",
      icon: <Utensils className="h-8 w-8" />,
      image: "./Main Course.png",
      description: "Hearty dinner ideas"
    },
    { 
      name: "Desserts",
      icon: <ChefHat className="h-8 w-8" />,
      image: "./Dessert.jpg",
      description: "Sweet treats"
    },
    { 
      name: "Healthy",
      icon: <Heart className="h-8 w-8" />,
      image: "./healthy.jpeg",
      description: "Nutritious options"
    },
    { 
      name: "Quick & Easy",
      icon: <Timer className="h-8 w-8" />,
      image: "./quick.jpeg",
      description: "Ready in 30 minutes"
    },
    { 
      name: "International",
      icon: <Globe className="h-8 w-8" />,
      image: "/sushi.jpeg",
      description: "Flavors from around the world"
    },
    { 
      name: "Vegetarian",
      icon: <Sparkles className="h-8 w-8" />,
      image: "./vegie.jpeg",
      description: "Plant-based delights"
    },
    { 
      name: "Trending",
      icon: <Fire className="h-8 w-8" />,
      image: "./trendy.jpeg",
      description: "Popular right now"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured recipes
        const recipesResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipe/fetch/`);
        const recipesData = await recipesResponse.json();
        
        if (recipesData.success) {
          setFeaturedRecipes(recipesData.data.slice(0, 3));
          
          // Calculate category counts from the fetched recipes
          const counts: Record<string, number> = {};
          recipesData.data.forEach((recipe: Recipe) => {
            const category = recipe.category.toLowerCase();
            counts[category] = (counts[category] || 0) + 1;
          });
          setCategoryStats(counts);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white-100">
      {/* Hero Section */}
      <section className="pink_container min-h-[600px]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-20 w-20 text-white animate-bounce" />
          </div>
          <h1 className="heading">
            Your Culinary Journey Starts Here
          </h1>
          <p className="sub-heading mb-8">
            Discover, create, and share amazing recipes with our AI-powered platform.
            Perfect for food lovers, home chefs, and culinary enthusiasts.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Link 
              to="/create" 
              className="startup-card_btn !bg-white !text-black hover:!bg-black hover:!text-white flex items-center gap-2 text-lg"
            >
              <Sparkles className="h-5 w-5" />
              Create Recipe
            </Link>
            <Link 
              to="/recipes" 
              className="startup-card_btn flex items-center gap-2 text-lg"
            >
              <Search className="h-5 w-5" />
              Browse Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section with Original Images and Real Counts */}
      <section className="section_container">
        <h2 className="text-30-bold text-center mb-4">Explore Recipe Categories</h2>
        <p className="text-16-medium text-black-100 text-center mb-12">
          Find inspiration in our curated collection of recipes
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/recipes?category=${category.name.toLowerCase()}`} 
              key={category.name}
              className="startup-card group text-center overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative h-[200px] rounded-[10px] overflow-hidden mb-4 border-[3px] border-black">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col items-center justify-end p-4">
                  <span className="text-30-extrabold mb-2">{category.name}</span>
                  <span className="text-white text-sm font-medium">{category.description}</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <span className="text-16-medium text-black-100">
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    `${categoryStats[category.name.toLowerCase()] || 0} recipes`
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="section_container bg-secondary-50">
        <h2 className="text-30-bold text-center mb-4">Featured Recipes</h2>
        <p className="text-16-medium text-black-100 text-center mb-12">
          Hand-picked recipes that you'll love
        </p>
        <div className="card_grid">
          {loading ? (
            // Loading state
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="startup-card animate-pulse">
                <div className="relative h-[250px] rounded-[10px] bg-gray-200 mb-4 border-[3px] border-black"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex items-center justify-between mt-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            featuredRecipes.map((recipe) => (
              <Link to={`/recipe/view/${recipe._id}`} key={recipe._id} className="startup-card group">
                <div className="relative h-[250px] rounded-[10px] overflow-hidden mb-4 border-[3px] border-black">
                  <img
                    src={recipe.imageURL}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-20-medium mb-2">{recipe.title}</h3>
                <p className="startup-card_desc">{recipe.description}</p>
                <div className="flex items-center justify-between mt-4 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-16-medium">{recipe.prepTime + recipe.cookTime} mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-16-medium">{recipe.servings} servings</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t-2 border-black-100/10 pt-4 mt-4">
                  <span className="text-16-medium text-black-100">
                    {recipe.category}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section_container text-center">
        <div className="startup-card max-w-3xl mx-auto">
          <ChefHat className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-30-bold mb-4">Ready to Start Cooking?</h2>
          <p className="text-16-medium text-black-100 mb-8">
            Join our community of food lovers and start sharing your culinary creations today.
          </p>
          <Link 
            to="/sign-up" 
            className="startup-card_btn inline-flex items-center gap-2 text-lg"
          >
            <Sparkles className="h-5 w-5" />
            Get Started - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;