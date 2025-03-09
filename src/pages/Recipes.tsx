import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, Clock, Users, Heart, X, ChevronDown, Clock3, Flame, Utensils } from 'lucide-react';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTime, setSelectedTime] = useState('Any Time');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Any Difficulty');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
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

  // Placeholder recipes data - replace with actual data from API
  const recipes = [
    {
      id: 1,
      title: "Vegan Chocolate Cake",
      description: "A rich and moist vegan chocolate cake that's perfect for any occasion.",
      image: "https://source.unsplash.com/random/800x600?chocolate+cake",
      prepTime: "45 mins",
      prepTimeMinutes: 45,
      servings: 8,
      likes: 124,
      author: "Sarah Johnson",
      category: "Dessert",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Mediterranean Quinoa Bowl",
      description: "Fresh and healthy Mediterranean-style quinoa bowl with roasted vegetables.",
      image: "https://source.unsplash.com/random/800x600?quinoa+bowl",
      prepTime: "25 mins",
      prepTimeMinutes: 25,
      servings: 4,
      likes: 98,
      author: "Michael Chen",
      category: "Lunch",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Classic Margherita Pizza",
      description: "Traditional Italian pizza with fresh basil, mozzarella, and tomato sauce.",
      image: "https://source.unsplash.com/random/800x600?margherita+pizza",
      prepTime: "30 mins",
      prepTimeMinutes: 30,
      servings: 6,
      likes: 156,
      author: "Laura Smith",
      category: "Dinner",
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Spicy Thai Green Curry",
      description: "Authentic Thai green curry with coconut milk and fresh vegetables.",
      image: "https://source.unsplash.com/random/800x600?thai+curry",
      prepTime: "35 mins",
      prepTimeMinutes: 35,
      servings: 4,
      likes: 142,
      author: "David Wilson",
      category: "Dinner",
      difficulty: "Hard"
    },
    {
      id: 5,
      title: "Berry Smoothie Bowl",
      description: "Refreshing smoothie bowl packed with mixed berries and healthy toppings.",
      image: "https://source.unsplash.com/random/800x600?smoothie+bowl",
      prepTime: "10 mins",
      prepTimeMinutes: 10,
      servings: 1,
      likes: 87,
      author: "Emma Davis",
      category: "Breakfast",
      difficulty: "Easy"
    },
    {
      id: 6,
      title: "Homemade Sushi Rolls",
      description: "Fresh and delicious sushi rolls with avocado and cucumber.",
      image: "https://source.unsplash.com/random/800x600?sushi+rolls",
      prepTime: "45 mins",
      prepTimeMinutes: 45,
      servings: 4,
      likes: 167,
      author: "Alex Kim",
      category: "Lunch",
      difficulty: "Hard"
    }
  ];

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
    const matchesDifficulty = selectedDifficulty === 'Any Difficulty' || recipe.difficulty === selectedDifficulty;
    
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
        {filteredRecipes.length > 0 ? (
          <div className="card_grid">
            {filteredRecipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="startup-card group">
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
                  <span className="text-16-medium text-black-100">By {recipe.author}</span>
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