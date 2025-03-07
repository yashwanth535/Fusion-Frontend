import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChefHat, Share2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pink_container">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-white" />
          </div>
          <h1 className="heading">
            Create Delicious Recipes with AI
          </h1>
          <p className="sub-heading !max-w-3xl">
            Transform your culinary ideas into detailed recipes using the power of AI. 
          </p>
          <Link 
            to="/create" 
            className="mt-8 inline-flex items-center px-8 py-4 bg-black rounded-full 
                     text-16-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Sparkles className="mr-2 h-5 w-5 text-white" />
            <span className='text-white'>Get Started</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="section_container">
        <h2 className="text-30-bold text-center mb-12">Why Choose Flavour Fusion?</h2>
        <div className="card_grid">
          {/* AI-Powered */}
          <div className="startup-card">
            <Sparkles className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-20-medium mb-2">AI-Powered Recipes</h3>
            <p className="startup-card_desc">
              Generate unique, detailed recipes tailored to your preferences using advanced AI technology.
            </p>
          </div>

          {/* Customizable */}
          <div className="startup-card">
            <ChefHat className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-20-medium mb-2">Fully Customizable</h3>
            <p className="startup-card_desc">
              Edit and customize generated recipes to match your style and requirements.
            </p>
          </div>

          {/* Share */}
          <div className="startup-card">
            <Share2 className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-20-medium mb-2">Easy Sharing</h3>
            <p className="startup-card_desc">
              Share your recipes across social media platforms with just one click.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Recipes Section */}
      <section className="section_container bg-secondary-50">
        <h2 className="text-30-bold text-center mb-12">Trending Recipes</h2>
        <div className="card_grid">
          {/* Placeholder for trending recipes - will be dynamically populated */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="startup-card">
              <img 
                src={`https://source.unsplash.com/random/800x600?cooking,${i}`}
                alt="Recipe"
                className="startup-card_img mb-4"
              />
              <h3 className="text-20-medium mb-2">Delicious Recipe {i}</h3>
              <p className="startup-card_desc">
                A mouth-watering recipe that combines traditional flavors with modern techniques.
              </p>
              <Link to={`/recipe/${i}`} className="startup-card_btn inline-block mt-4">
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;