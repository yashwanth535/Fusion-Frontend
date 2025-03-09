import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ChefHat, Share2, Edit, Save, Clock, Users, Utensils, ArrowLeft } from 'lucide-react';
import TextToSpeechGoogle from '../components/TextToSpeechGoogle';

const RecipeOutput = () => {
  const { id } = useParams();
  const location = useLocation();
  const recipe = location.state?.recipe || {
    title: "Recipe Not Found",
    description: "The recipe you're looking for could not be found.",
    image: "https://source.unsplash.com/random/1200x800?cooking",
    prepTime: "N/A",
    cookTime: "N/A",
    servings: 0,
    ingredients: [],
    instructions: []
  };

  const ttsContent = `
    ${recipe.title}. 
    ${recipe.description}
    
    Preparation time: ${recipe.prepTime}. 
    Cooking time: ${recipe.cookTime}. 
    Serves ${recipe.servings}.
    
    Ingredients:
    ${recipe.ingredients.join('. ')}
    
    Instructions:
    ${recipe.instructions.join('. ')}
  `;

  return (
    <div className="min-h-screen bg-white-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[22px] border-[5px] border-black p-8 shadow-lg">
          {/* Back Button */}
          <Link 
            to="/create" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Recipe Creator
          </Link>

          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <ChefHat className="h-10 w-10 text-primary" />
              <h1 className="text-30-bold">{recipe.title}</h1>
            </div>
            <div className="flex gap-4">
              <button className="startup-card_btn flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button className="startup-card_btn flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save
              </button>
              <button className="startup-card_btn flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>

          <TextToSpeechGoogle content={ttsContent} />

          {/* Recipe Image */}
          <div className="relative h-[400px] rounded-[15px] overflow-hidden mb-8 border-[3px] border-black shadow-lg">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Recipe Info */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="startup-card flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Prep Time</p>
                <p className="text-20-medium">{recipe.prepTime}</p>
              </div>
            </div>
            <div className="startup-card flex items-center justify-center gap-3">
              <Utensils className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Cook Time</p>
                <p className="text-20-medium">{recipe.cookTime}</p>
              </div>
            </div>
            <div className="startup-card flex items-center justify-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Servings</p>
                <p className="text-20-medium">{recipe.servings}</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Description */}
            <div className="bg-primary-50 rounded-xl p-6 mb-8">
              <p className="text-16-medium text-black-100">
                {recipe.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="startup-card mb-8">
              <h2 className="text-24-black mb-4 -mt-2">Ingredients</h2>
              <ul className="list-disc pl-6">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-16-medium text-black-100 mb-2">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="startup-card">
              <h2 className="text-24-black mb-4 -mt-2">Instructions</h2>
              <ol className="list-decimal pl-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-16-medium text-black-100 mb-4">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeOutput;