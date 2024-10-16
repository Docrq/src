import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (response.data.meals) {
          setRecipes(response.data.meals);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  if (loading) {
    return <div>Chargement des recettes...</div>;
  }

  return (
    <div className="recipes-section">
      <h2>Recettes</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card" onClick={() => handleRecipeClick(recipe)}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
            <h3>{recipe.strMeal}</h3>
            <p>Catégorie: {recipe.strCategory}</p>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="recipe-details">
          <button onClick={closeRecipeDetails}>Fermer</button>
          <h2>{selectedRecipe.strMeal}</h2>
          <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
          <p><strong>Catégorie:</strong> {selectedRecipe.strCategory}</p>
          <p><strong>Origine:</strong> {selectedRecipe.strArea}</p>
          <h3>Ingrédients:</h3>
          <ul>
            {Object.keys(selectedRecipe)
              .filter(key => key.startsWith('strIngredient') && selectedRecipe[key])
              .map((key, index) => (
                <li key={index}>
                  {selectedRecipe[key]} - {selectedRecipe[`strMeasure${key.slice(13)}`]}
                </li>
              ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{selectedRecipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;