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
        <div className="flex justify-between mt-3">
            <p className="font-bold">Posted: <span className="text-sm"> {recipe.postDate} </span></p>
            <p className="font-bold">Edited: <span className="text-sm">{recipe.editDate} </span></p>
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
                           <div className="border-solid bg-red-200 text-center p-2 rounded">
                    
                            <h4 className="font-bold" key={special.uuid}>
                                {special.title} 
                            </h4>
                            <p>{special.text}</p>
                            <div className="">
                        
                                { special.type == 'local' &&
                                    <p className="text-green-700">{special.type}! </p>
                                }
                                { special.type == 'event' &&
                                    <p className="text-red-700">{special.type}! </p>
                                }
                                { special.type == 'promocode' &&
                                    <p className="text-blue-700">{special.type}! </p>
                                }
                                { special.type == 'sale' &&
                                    <p className="text-purple-700">{special.type}! </p>
                                }
                            </div>
                          </div>
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

        
        
        <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={() => closeRecipe(false)}>Back</button>
      </div>
    </div>
  );
}
