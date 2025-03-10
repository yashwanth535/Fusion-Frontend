import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChefHat, Share2, Edit, Save, Clock, Users, Utensils, ArrowLeft, Download } from 'lucide-react';
import TextToSpeechGoogle from '../components/TextToSpeechGoogle';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RecipeView = () => {
  const { id } = useParams();

  interface Recipe {
    title: string;
    description: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    ingredients: string[];
    instructions: string[];
    imageURL: string;
  }

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipe/fetch/${id}`);

        if (!response.ok) {
          throw new Error('Recipe not found');
        }

        const data = await response.json();
        setRecipe(data.data);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const downloadPDF = () => {
    if (!recipe) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Set title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(recipe.title, margin, 20);

    // Set description
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const descriptionLines = doc.splitTextToSize(recipe.description, contentWidth);
    doc.text(descriptionLines, margin, 30);

    let yPos = 30 + descriptionLines.length * 7;

    // Recipe info
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Prep Time: ${recipe.prepTime} min | Cook Time: ${recipe.cookTime} min | Servings: ${recipe.servings}`, margin, yPos);
    yPos += 10;

    // Ingredients
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Ingredients', margin, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    recipe.ingredients.forEach(ingredient => {
      doc.text(`• ${ingredient}`, margin + 5, yPos);
      yPos += 7;
    });
    
    yPos += 5;

    // Instructions
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Instructions', margin, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    recipe.instructions.forEach((instruction, index) => {
      const instructionLines = doc.splitTextToSize(`${index + 1}. ${instruction}`, contentWidth - 5);
      doc.text(instructionLines, margin, yPos);
      yPos += instructionLines.length * 7 + 3;
      
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 20;
      }
    });

    // Save the PDF
    doc.save(`${recipe.title.replace(/\s+/g, '-').toLowerCase()}-recipe.pdf`);
  };

  if (loading) return <p className="text-center">Loading recipe...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center">Recipe not found</p>;

  const ttsContent = `
    ${recipe.title}. 
    ${recipe.description}
    
    Preparation time: ${recipe.prepTime} minutes. 
    Cooking time: ${recipe.cookTime} minutes. 
    Serves ${recipe.servings}.
    
    Ingredients:
    ${(recipe.ingredients ?? []).join('. ')}
    
    Instructions:
    ${(recipe.instructions ?? []).join('. ')}
  `;

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
              <button className="startup-card_btn flex items-center gap-2" onClick={
                () => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }><Share2 className="h-4 w-4" />Share</button>
              <button className="startup-card_btn flex items-center gap-2" onClick={downloadPDF}>
                <Download className="h-4 w-4" />PDF
              </button>
            </div>
          </div>

          <TextToSpeechGoogle content={ttsContent} />

          <div className="relative h-[400px] rounded-[15px] overflow-hidden mb-8 border-[3px] border-black shadow-lg">
            <img src={recipe.imageURL} alt={recipe.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="startup-card flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Prep Time</p>
                <p className="text-20-medium">{recipe.prepTime} min</p>
              </div>
            </div>
            <div className="startup-card flex items-center justify-center gap-3">
              <Utensils className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Cook Time</p>
                <p className="text-20-medium">{recipe.cookTime} min</p>
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
            <div className="bg-primary-50 rounded-xl p-6 mb-8">
              <p className="text-16-medium text-black-100">{recipe.description}</p>
            </div>

            <div className="startup-card mb-8">
              <h2 className="text-24-black mb-4 -mt-2">Ingredients</h2>
              <ul className="list-disc pl-6">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="text-16-medium text-black-100 mb-2">{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="startup-card">
              <h2 className="text-24-black mb-4 -mt-2">Instructions</h2>
              <ol className="list-decimal pl-6">
                {recipe.instructions?.map((instruction, index) => (
                  <li key={index} className="text-16-medium text-black-100 mb-4">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeView;