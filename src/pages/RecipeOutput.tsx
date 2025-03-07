import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChefHat, Share2, Edit, Save } from 'lucide-react';

const RecipeOutput = () => {
  const { id } = useParams();

  // Placeholder recipe data - replace with actual data from API
  const recipe = {
    title: "Vegan Chocolate Cake",
    description: "A rich and moist vegan chocolate cake that's perfect for any occasion.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 cups sugar",
      "3/4 cup cocoa powder",
      "2 teaspoons baking soda",
      "1 teaspoon salt",
      "2 cups warm water",
      "2 teaspoons vanilla extract",
      "2/3 cup vegetable oil",
      "2 teaspoons vinegar"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C)",
      "Mix dry ingredients in a large bowl",
      "Add wet ingredients and mix until smooth",
      "Pour into prepared pan and bake for 30-35 minutes"
    ]
  };

  return (
    <div className="min-h-screen bg-white-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[22px] border-[5px] border-black p-8 shadow-lg">
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

          <div className="prose prose-lg max-w-none">
            <p className="text-16-medium text-black-100 mb-8">
              {recipe.description}
            </p>

            <h2 className="text-24-black mb-4">Ingredients</h2>
            <ul className="list-disc pl-6 mb-8">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-16-medium text-black-100 mb-2">
                  {ingredient}
                </li>
              ))}
            </ul>

            <h2 className="text-24-black mb-4">Instructions</h2>
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
  );
};

export default RecipeOutput;