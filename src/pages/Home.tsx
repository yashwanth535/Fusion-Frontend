import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChefHat, Clock, Users, Heart, Utensils, Search, Timer, Globe, Siren as Fire } from 'lucide-react';

const Home = () => {
  // Featured recipes data
  const featuredRecipes = [
    {
      id: 1,
      title: "Caramelized Banana Pancakes",
      description: "Fluffy pancakes topped with golden caramelized bananas and maple syrup.",
      image: "https://source.unsplash.com/random/800x600?pancakes",
      prepTime: "15 mins",
      servings: 4,
      likes: 234,
      author: "Emma Davis"
    },
    {
      id: 2,
      title: "Mediterranean Grilled Salmon",
      description: "Fresh salmon fillet with Mediterranean herbs and lemon.",
      image: "https://source.unsplash.com/random/800x600?grilled+salmon",
      prepTime: "25 mins",
      servings: 2,
      likes: 189,
      author: "Michael Chen"
    },
    {
      id: 3,
      title: "Rustic Apple Tart",
      description: "Beautiful free-form tart with fresh apples and caramel drizzle.",
      image: "https://source.unsplash.com/random/800x600?apple+tart",
      prepTime: "40 mins",
      servings: 8,
      likes: 156,
      author: "Sarah Johnson"
    }
  ];

  // Enhanced Categories with more options and icons
  const categories = [
    { 
      name: "Breakfast",
      icon: <Timer className="h-8 w-8" />,
      image: "./Breakfast.png",
      description: "Start your day right",
      count: 128
    },
    { 
      name: "Main Course",
      icon: <Utensils className="h-8 w-8" />,
      image: "./Main Course.png",
      description: "Hearty dinner ideas",
      count: 256
    },
    { 
      name: "Desserts",
      icon: <ChefHat className="h-8 w-8" />,
      image: "./Dessert.jpg",
      description: "Sweet treats",
      count: 164
    },
    { 
      name: "Healthy",
      icon: <Heart className="h-8 w-8" />,
      image: "./healthy.jpeg",
      description: "Nutritious options",
      count: 192
    },
    { 
      name: "Quick & Easy",
      icon: <Timer className="h-8 w-8" />,
      image: "./quick.jpeg",
      description: "Ready in 30 minutes",
      count: 145
    },
    { 
      name: "International",
      icon: <Globe className="h-8 w-8" />,
      image: "/sushi.jpeg",
      description: "Flavors from around the world",
      count: 218
    },
    { 
      name: "Vegetarian",
      icon: <Sparkles className="h-8 w-8" />,
      image: "./vegie.jpeg",
      description: "Plant-based delights",
      count: 176
    },
    { 
      name: "Trending",
      icon: <Fire className="h-8 w-8" />,
      image: "./trendy.jpeg",
      description: "Popular right now",
      count: 95
    }
  ];

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

      {/* Enhanced Categories Section */}
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
                  {category.count} recipes
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
          {featuredRecipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="startup-card group">
              <div className="relative h-[250px] rounded-[10px] overflow-hidden mb-4 border-[3px] border-black">
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