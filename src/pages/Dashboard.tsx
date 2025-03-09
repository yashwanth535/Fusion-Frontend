import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Plus, 
  Settings, 
  Eye, 
  Clock, 
  BookOpen, 
  Heart,
  Share2,
  Edit3,
  Trash2,
  Filter,
  Search,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Recipe, RecipeCardSkeleton } from '../components/RecipeCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stats = {
    totalRecipes: recipes.length,
    totalViews: recipes.reduce((acc, recipe) => acc + (recipe.views || 0), 0),
    avgRating: 4.5,
    followers: 128
  };

  const categories = ['all', 'dessert', 'main course', 'salad', 'appetizer', 'breakfast'];

  useEffect(() => {
    // Simulate fetching user recipes
    // Replace with actual API call in production
    setTimeout(() => {
      setRecipes([
        {
          _id: "1",
          title: "Vegan Chocolate Cake",
          description: "A rich and moist vegan chocolate cake that's perfect for any occasion.",
          image: "https://source.unsplash.com/random/800x600?chocolate+cake",
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

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          recipe.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-16 w-16 text-primary mx-auto mb-4" />
          <p className="text-20-medium mb-4">Please log in to view your dashboard</p>
          <Link to="/login" className="startup-card_btn inline-flex items-center gap-2">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-100">
      {/* Profile Header */}
      <section className="pink_container mb-20 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-48 h-48 rounded-full border-4 border-white shadow-xl"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-30-extrabold text-white mb-2">{user.name}</h1>
              <p className="text-20-medium text-white opacity-90 mb-4">
                @{user.email.split('@')[0]}
              </p>
              <p className="text-16-medium text-white opacity-80 mb-6 max-w-2xl">
                Passionate food enthusiast and recipe creator. Sharing my culinary adventures
                and inspiring others to explore the joy of cooking.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  to="/create"
                  className="startup-card_btn !bg-white !text-black hover:!bg-black hover:!text-white flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Recipe
                </Link>
                <button className="startup-card_btn flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="startup-card text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-30-bold">{stats.totalRecipes}</p>
            <p className="text-16-medium text-black-100">Recipes</p>
          </div>
          <div className="startup-card text-center">
            <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-30-bold">{stats.totalViews}</p>
            <p className="text-16-medium text-black-100">Total Views</p>
          </div>
          <div className="startup-card text-center">
            <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-30-bold">{stats.followers}</p>
            <p className="text-16-medium text-black-100">Followers</p>
          </div>
          <div className="startup-card text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-30-bold">{stats.avgRating}</p>
            <p className="text-16-medium text-black-100">Avg Rating</p>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-30-bold">Your Recipes</h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="startup-form_input pl-10"
                />
              </div>
              <div className="relative flex-1 sm:w-48">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="startup-form_input pl-10 capitalize"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="capitalize">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <RecipeCardSkeleton key={n} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div key={recipe._id} className="startup-card group">
                  <div className="relative h-48 rounded-[10px] overflow-hidden mb-4 border-[3px] border-black">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-20-medium mb-2">{recipe.title}</h3>
                  <p className="startup-card_desc">{recipe.description}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-16-medium text-primary bg-primary-50 px-3 py-1 rounded-full">
                      {recipe.category}
                    </span>
                    <div className="flex items-center gap-2 text-black-100">
                      <Eye className="h-4 w-4" />
                      <span>{recipe.views} views</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-black-100/10">
                    <Link
                      to={`/recipe/${recipe._id}`}
                      className="text-16-medium text-primary hover:underline"
                    >
                      View Recipe
                    </Link>
                    <button className="p-2 hover:bg-primary-50 rounded-full transition-colors">
                      <Share2 className="h-5 w-5 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <ChefHat className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-20-medium mb-4">No recipes found</p>
              <Link
                to="/create"
                className="startup-card_btn inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create New Recipe
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;