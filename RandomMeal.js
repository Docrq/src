// RandomMeal.js
import React, { useEffect, useState } from 'react';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const RandomMeal = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMeal = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Erreur de réseau : ' + response.statusText);
        }
        const data = await response.json();
        setMeal(data.meals[0]); // On récupère le premier plat du tableau
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMeal();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="meal-card">
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p><strong>Categorie :</strong> {meal.strCategory}</p>
      <p><strong>Instructions :</strong> {meal.strInstructions}</p>
      <p><strong>Ingrédients :</strong></p>
      <ul>
        {Object.keys(meal)
          .filter(key => key.startsWith('strIngredient') && meal[key])
          .map((key, index) => (
            <li key={index}>
              {meal[key]} - {meal[`strMeasure${index + 1}`]}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RandomMeal;
