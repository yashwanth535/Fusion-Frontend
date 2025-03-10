import React, { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { ChefHat, Share2, Edit, Save, Clock, Users, Utensils, ArrowLeft, Check, Copy, X, BookCheck, DraftingCompass, Image } from 'lucide-react';
import TextToSpeechGoogle from '../components/TextToSpeechGoogle';

const RecipeOutput = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenStatus, setTokenStatus] = useState<'valid' | 'invalid' | 'unknown'>('unknown');
  const [isEditing, setIsEditing] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'publish' | 'share' | 'draft'>('publish');
  const [imageUrl, setImageUrl] = useState('');
  const [editedRecipe, setEditedRecipe] = useState(location.state?.recipe || {
    title: "Recipe Not Found",
    description: "The recipe you're looking for could not be found.",
    image: "https://source.unsplash.com/random/1200x800?cooking",
    prepTime: "N/A",
    cookTime: "N/A",
    servings: 0,
    ingredients: [],
    instructions: []
  });

  const recipe = isEditing ? editedRecipe : (location.state?.recipe || editedRecipe);
  
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
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
    // For now, we'll just update the local state
    location.state = { ...location.state, recipe: editedRecipe };
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRecipe(location.state?.recipe || editedRecipe);
  };

  const handleShare = () => {
    setModalType('share');
    setImageUrl(recipe.image);
    setModalOpen(true);
  };

  const handlePublish = () => {
    setModalType('publish');
    setImageUrl(recipe.image);
    setModalOpen(true);
  };

  const handleDraft = () => {
    setModalType('draft');
    setImageUrl(recipe.image);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async () => {
    const recipeUrl = window.location.href;
    
    // Update recipe with new image URL
    const updatedRecipe = {
      ...recipe,
      image: imageUrl
    };
    
    // Update state to use the new image
    if (isEditing) {
      setEditedRecipe(updatedRecipe);
    } else {
      location.state = { ...location.state, recipe: updatedRecipe };
    }
    
    // Handle different actions based on modal type
    if (modalType === 'share') {
      // Copy URL to clipboard
      navigator.clipboard.writeText(recipeUrl).then(() => {
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    } else if (modalType === 'publish' || modalType === 'draft') {
      setIsLoading(true);
      setError('');
    
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        return;
      }
    
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const endpoint = '/api/v1/recipe/save'; // Common save endpoint
    
        const requestData = {
          ...updatedRecipe,
          isPublished: modalType === 'publish' // True for publish, false for draft
        };
    
        console.log(`Attempting to ${modalType} recipe at: ${backendUrl}${endpoint}`);
        console.log('Request Payload:', requestData);
        console.log('Auth token exists:', !!token);
        if (token.length > 8) {
          console.log('Token format check:', `${token.substring(0, 4)}...${token.substring(token.length - 4)}`);
        }
    
        const response = await fetch(`${backendUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestData),
          signal: AbortSignal.timeout(30000)
        });
    
        if (response.status === 401) {
          localStorage.removeItem('token');
          setTokenStatus('invalid');
          throw new Error('Your session has expired. Please log in again.');
        }
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', errorText);
          throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log(`Recipe ${modalType}ed successfully:`, data);
    
        setIsLoading(false);
        alert(`Recipe ${modalType}ed successfully!`);
    
        // Navigate after publishing
        if (modalType === 'publish') {
          navigate(`/recipe/view/${data._id}`, { state: { recipe: data } });
        }
      } catch (error) {
        console.error(`Error during recipe ${modalType}:`, error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
        setIsLoading(false);
      }
    }
    
    
    setModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setEditedRecipe((prev: any) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'ingredients' | 'instructions') => {
    setEditedRecipe((prev: { [x: string]: string[]; }) => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setEditedRecipe((prev: { [x: string]: any; }) => ({
      ...prev,
      [field]: [...prev[field], field === 'ingredients' ? 'New ingredient' : 'New step']
    }));
  };

  const removeArrayItem = (index: number, field: 'ingredients' | 'instructions') => {
    setEditedRecipe((prev: { [x: string]: any[]; }) => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index)
    }));
  };

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
              {isEditing ? (
                <input
                  type="text"
                  value={editedRecipe.title}
                  onChange={(e) => handleChange(e, 'title')}
                  className="text-30-bold startup-form_input"
                />
              ) : (
                <h1 className="text-30-bold">{recipe.title}</h1>
              )}
            </div>
            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="startup-card_btn flex items-center gap-2 !bg-primary !text-white"
                  >
                    <Check className="h-4 w-4" />
                    Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="startup-card_btn flex items-center gap-2 !bg-red-500 !text-white"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleEdit}
                    className="startup-card_btn flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button 
                    onClick={handlePublish}
                    className="startup-card_btn flex items-center gap-2"
                  >
                    <BookCheck className="h-4 w-4" />
                    Publish
                  </button>
                  <button
                    onClick={handleDraft}
                    className="startup-card_btn flex items-center gap-2"
                  >
                    <DraftingCompass className="h-4 w-4" />
                    Draft
                  </button>
                </>
              )}
            </div>
          </div>

          <TextToSpeechGoogle content={ttsContent} />

          {/* Recipe Info */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="startup-card flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Prep Time</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedRecipe.prepTime}
                    onChange={(e) => handleChange(e, 'prepTime')}
                    className="text-20-medium startup-form_input text-center"
                  />
                ) : (
                  <p className="text-20-medium">{recipe.prepTime}</p>
                )}
              </div>
            </div>
            <div className="startup-card flex items-center justify-center gap-3">
              <Utensils className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Cook Time</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedRecipe.cookTime}
                    onChange={(e) => handleChange(e, 'cookTime')}
                    className="text-20-medium startup-form_input text-center"
                  />
                ) : (
                  <p className="text-20-medium">{recipe.cookTime}</p>
                )}
              </div>
            </div>
            <div className="startup-card flex items-center justify-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-16-medium">Servings</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedRecipe.servings}
                    onChange={(e) => handleChange(e, 'servings')}
                    className="text-20-medium startup-form_input text-center"
                  />
                ) : (
                  <p className="text-20-medium">{recipe.servings}</p>
                )}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Description */}
            <div className="bg-primary-50 rounded-xl p-6 mb-8">
              {isEditing ? (
                <textarea
                  value={editedRecipe.description}
                  onChange={(e) => handleChange(e, 'description')}
                  className="text-16-medium text-black-100 startup-form_textarea w-full"
                  rows={4}
                />
              ) : (
                <p className="text-16-medium text-black-100">
                  {recipe.description}
                </p>
              )}
            </div>

            {/* Ingredients */}
            <div className="startup-card mb-8">
              <h2 className="text-24-black mb-4 -mt-2">Ingredients</h2>
              <ul className="list-disc pl-6">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="text-16-medium text-black-100 mb-2">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editedRecipe.ingredients[index]}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                          className="startup-form_input flex-1"
                        />
                        <button
                          onClick={() => removeArrayItem(index, 'ingredients')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      ingredient
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('ingredients')}
                  className="startup-card_btn mt-4"
                >
                  Add Ingredient
                </button>
              )}
            </div>

            {/* Instructions */}
            <div className="startup-card">
              <h2 className="text-24-black mb-4 -mt-2">Instructions</h2>
              <ol className="list-decimal pl-6">
                {recipe.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="text-16-medium text-black-100 mb-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <textarea
                          value={editedRecipe.instructions[index]}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                          className="startup-form_textarea flex-1"
                          rows={2}
                        />
                        <button
                          onClick={() => removeArrayItem(index, 'instructions')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      instruction
                    )}
                  </li>
                ))}
              </ol>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('instructions')}
                  className="startup-card_btn mt-4"
                >
                  Add Instruction
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for image URL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[22px] border-[5px] border-black p-6 max-w-lg w-full shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-24-black">
                {modalType === 'publish' ? 'Publish Recipe' : 
                 modalType === 'share' ? 'Share Recipe' : 'Save as Draft'}
              </h2>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-16-medium text-black-100 mb-2">
                Recipe Image URL
              </label>
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="startup-form_input flex-1"
                />
              </div>
              <p className="text-14-regular text-gray-500 mt-2">
                Add an image URL to make your recipe stand out
              </p>
            </div>

            {imageUrl && (
              <div className="mb-6">
                <p className="text-16-medium text-black-100 mb-2">Preview:</p>
                <div className="h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={imageUrl}
                    alt="Recipe preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://source.unsplash.com/random/1200x800?cooking";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={handleModalClose}
                className="startup-card_btn !bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="startup-card_btn !bg-primary !text-white"
              >
                {modalType === 'publish' ? 'Publish' : 
                 modalType === 'share' ? 'Share' : 'Save Draft'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeOutput;