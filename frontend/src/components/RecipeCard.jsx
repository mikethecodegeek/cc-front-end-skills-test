import React, { useState } from "react";
import { useQuery } from "react-query";

export default function RecipeCard({ recipe, closeRecipe }) {
  const [specials, setSpecials] = useState([]);
  const getRecipes = async () => {
    const response = await fetch("/specials");
    const data = await response.json();
    setSpecials(data);
    console.log(data);
    return data;
  };

  const { data, status } = useQuery("recipes", getRecipes);

  // Bonus: Create a view to add and update recipes or specials.
  // Image upload not required.
  // Both endpoints support GET, POST and PATCH.
  // Bonus: Create a view to add and update recipes or specials.
  return (
    <div className="flex content-center items-center w-full">
      <div className="recipeCard flex flex-col justify-center p-10 shadow-md lg:w-4/5 xl:w-3/5 ">
        <h2 className="text-center text-3xl mb-5">{recipe.title}</h2>
        <img src={recipe.images.medium} alt={recipe.name} />
        <div className="flex bg-gray-200 justify-between p-1 shadow-md">
          <div className="p-2 text-sm text-center">
            <p className="">SERVES</p>
            <p className="font-bold">{recipe.servings}</p>
          </div>
          <div className="p-2 text-sm text-center">
            <p>PREP TIME</p>
            <p className="font-bold">{recipe.prepTime} MINS</p>
          </div>
          <div className="p-2 text-sm text-center">
            <p>COOK TIME</p>
            <p className="font-bold">{recipe.cookTime} MINS</p>
          </div>
        </div>
        <p className="text-center mt-10 mb-10">{recipe.description}</p>
        <div className="lg:flex">
         

          <div className="bg-gray-200 p-10 mr-10 shadow-md">
            <h3 className="text-lg mb-5 uppercase">Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <>
                    <li key={ingredient.uuid}>
                      {ingredient.amount} {ingredient.measurement}{" "}
                      {ingredient.name}
                    </li>
                    {specials.map((special) => {
                      if (special.ingredientId === ingredient.uuid) {
                        return (
                          <h4 key={special.uuid}>
                            {special.title} {special.type} {special.text}
                          </h4>
                        );
                      }
                    })}
                  </>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-lg mt-5 uppercase mb-5">Instructions</h3>
            <ul>
              {recipe.directions.map((instruction, index) => {
                return instruction.optional ? (
                  <li key={index}>{index+1}. {instruction.instructions} (optional)</li>
                ) : (
                  <li key={index}>{index+1}. {instruction.instructions}</li>
                );
              })}
            </ul>
          </div>
        </div>

        <h3>Post Date: {recipe.postDate}</h3>
        <h3>Edit Date: {recipe.editDate}</h3>
        
        <button onClick={() => closeRecipe(false)}>Back</button>
      </div>
    </div>
  );
}
