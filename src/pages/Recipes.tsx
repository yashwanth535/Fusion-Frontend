import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, Clock, Users, Heart, X, ChevronDown, Clock3, Flame, Utensils } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  category: string;
  difficulty: string;
  cuisine: string;
  mealType: string;
  author: string;
  prepTimeMinutes: number;
  servings: number;
  likes: number;
}

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTime, setSelectedTime] = useState('Any Time');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Any Difficulty');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  
  const filterRef = useRef<HTMLDivElement>(null);

  // Update showClearButton when searchQuery changes
  useEffect(() => {
    setShowClearButton(searchQuery.length > 0);
  }, [searchQuery]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Categories for filter
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan', 'Vegetarian'];
  
  // Time filters
  const timeFilters = ['Any Time', 'Quick (< 15 min)', 'Medium (15-30 min)', 'Long (> 30 min)'];
  
  // Difficulty filters
  const difficultyFilters = ['Any Difficulty', 'Easy', 'Medium', 'Hard'];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipe/fetch/`);
        const data = await response.json();
        
        if (data.success) {
          // Transform backend data to match our Recipe interface
          const transformedRecipes = data.data.map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            image: item.imageURL,
            prepTime: `${item.prepTime + item.cookTime} mins`,
            category: item.category,
            difficulty: item.difficulty,
            cuisine: item.cuisine,
            mealType: item.mealType,
            author: item.uploadedBy, // This might need to be fetched separately or included in the response
            prepTimeMinutes: item.prepTime + item.cookTime,
            servings: item.servings,
            likes: 0 // This might need to be fetched separately or included in the response
          }));
          
          setRecipes(transformedRecipes);
        }
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedTime('Any Time');
    setSelectedDifficulty('Any Difficulty');
  };

  const toggleFilter = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterName);
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedTime !== 'Any Time') count++;
    if (selectedDifficulty !== 'Any Difficulty') count++;
    return count;
  };

  const filteredRecipes = recipes.filter(recipe => {
    // Search query filter
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    
    // Time filter
    let matchesTime = true;
    if (selectedTime === 'Quick (< 15 min)') {
      matchesTime = recipe.prepTimeMinutes < 15;
    } else if (selectedTime === 'Medium (15-30 min)') {
      matchesTime = recipe.prepTimeMinutes >= 15 && recipe.prepTimeMinutes <= 30;
    } else if (selectedTime === 'Long (> 30 min)') {
      matchesTime = recipe.prepTimeMinutes > 30;
    }
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === 'Any Difficulty' || recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesTime && matchesDifficulty;
  });

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
          
          {/* Enhanced Search Bar */}
          <div 
            className="search-form relative max-w-2xl mx-auto mt-8 bg-white border-[3px] border-black rounded-full overflow-hidden flex items-center transition-all duration-300"
            style={{ 
              boxShadow: isSearchFocused ? '0 0 0 3px rgba(251, 232, 67, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
              transform: isSearchFocused ? 'translateY(-2px)' : 'none'
            }}
          >
            <Search className="h-6 w-6 text-black-100 ml-4" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="search-input flex-1 py-3 px-4 outline-none border-none text-16-medium"
            />
            {showClearButton && (
              <button 
                onClick={handleClearSearch}
                className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
          
          {/* Improved Filters */}
          <div 
            ref={filterRef}
            className="filter-container max-w-2xl mx-auto mt-4 flex flex-wrap items-center justify-center gap-3"
          >
            {/* Category Filter */}
            <div className="relative z-50">
              <button 
                onClick={() => toggleFilter('category')}
                className={`filter-button ${selectedCategory !== 'All' ? 'filter-button-active' : ''}`}
              >
                <Utensils className="h-4 w-4" />
                <span>{selectedCategory}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeFilter === 'category' && (
                <div className="filter-dropdown">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setActiveFilter(null);
                      }}
                      className={`filter-option ${selectedCategory === category ? 'filter-option-selected' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Time Filter */}
            <div className="relative z-50">
              <button 
                onClick={() => toggleFilter('time')}
                className={`filter-button ${selectedTime !== 'Any Time' ? 'filter-button-active' : ''}`}
              >
                <Clock3 className="h-4 w-4" />
                <span>{selectedTime}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeFilter === 'time' && (
                <div className="filter-dropdown">
                  {timeFilters.map(time => (
                    <button
                      key={time}
                      onClick={() => {
                        setSelectedTime(time);
                        setActiveFilter(null);
                      }}
                      className={`filter-option ${selectedTime === time ? 'filter-option-selected' : ''}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Difficulty Filter */}
            <div className="relative z-50">
              <button 
                onClick={() => toggleFilter('difficulty')}
                className={`filter-button ${selectedDifficulty !== 'Any Difficulty' ? 'filter-button-active' : ''}`}
              >
                <Flame className="h-4 w-4" />
                <span>{selectedDifficulty}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeFilter === 'difficulty' && (
                <div className="filter-dropdown">
                  {difficultyFilters.map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => {
                        setSelectedDifficulty(difficulty);
                        setActiveFilter(null);
                      }}
                      className={`filter-option ${selectedDifficulty === difficulty ? 'filter-option-selected' : ''}`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Clear Filters Button */}
            {getActiveFiltersCount() > 0 && (
              <button 
                onClick={handleClearFilters}
                className="filter-clear-button"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>
          
          {/* Search Results Count */}
          <p className="mt-4 text-white text-16-medium">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="section_container">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-16-medium">Loading recipes...</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="card_grid">
            {filteredRecipes.map((recipe) => (
              <Link to={`/recipe/view/${recipe.id}`} key={recipe.id} className="startup-card group">
                <div className="relative h-[200px] rounded-[10px] overflow-hidden mb-4 border-[3px] border-black">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.category}
                  </div>
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
                
                <div className="flex items-center justify-between mt-4">
                  <div className="px-3 py-1 bg-primary bg-opacity-20 rounded-full text-sm font-medium">
                    {recipe.difficulty}
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-16-medium">{recipe.likes}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t-2 border-black-100/10 pt-4 mt-4">
                  <span className="text-16-medium text-black-100"></span>
                  <button className="startup-card_btn py-2 px-4">View Recipe</button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <ChefHat className="h-16 w-16 text-primary mb-4" />
            <h3 className="text-24-black mb-2">No recipes found</h3>
            <p className="text-16-medium text-black-100 mb-6">Try adjusting your filters or search query</p>
            <button 
              onClick={handleClearFilters}
              className="startup-card_btn py-2 px-6"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipes;