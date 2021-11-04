import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function RecipeCard({ closeRecipe, ...props }) {
  const [specials, setSpecials] = useState([]);
  const [recipe,setRecipe] = useState({});

  const getRecipe = async () => {
    const response = await fetch(`/recipes/${props.match.params.uuid}`)
    const data = await response.json()
    return data;
  }

  useQuery('recipe', getRecipe, {onSuccess:data=>setRecipe(data)})
  const specialColors = {
    local: "text-green-700",
    event: "text-red-700",
    promocode: "text-blue-700",
    sale: "text-purple-700",
  };

  const buildSpecialsObj = (arr) => {
    let specialsObj = {};
    arr.forEach((special) => {
      specialsObj[special.ingredientId] = special;
    });
    return specialsObj;
  };

  const getSpecials = async () => {
    const response = await fetch("/specials");
    const data = await response.json();
    let specialsObj = buildSpecialsObj(data);
    setSpecials(specialsObj);
    return specialsObj;
  };

  useQuery("recipes", getSpecials);

  return (
    <>
    {recipe.title &&
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
          <p className="font-bold">
            Posted: <span className="text-sm"> {recipe.postDate} </span>
          </p>
          <p className="font-bold">
            Edited: <span className="text-sm">{recipe.editDate} </span>
          </p>
        </div>
        <p className="text-center mt-10 mb-10 text-xl">{recipe.description}</p>
        <div className="lg:flex">
          <div className="bg-gray-200 p-10 mr-10 shadow-md">
            <h3 className="text-lg mb-5 uppercase font-bold">Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <div key={ingredient.uuid}>
                    <li className="my-2">
                      {ingredient.amount} {ingredient.measurement}{" "}
                      {ingredient.name}
                    </li>
                    {specials[ingredient.uuid] && (
                      <div
                       
                        className="border-solid bg-red-200 text-center p-2 rounded mt-2 mb-2"
                      >
                        <h4 className="font-bold">
                          {specials[ingredient.uuid].title}
                        </h4>
                        <p>{specials[ingredient.uuid].text}</p>
                        <div>
                          <p
                            className={
                              specialColors[specials[ingredient.uuid].type]
                            }
                          >
                            {specials[ingredient.uuid].type}!{" "}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-lg mt-5 uppercase mb-5 font-bold">
              Instructions
            </h3>
            <ul>
              {recipe.directions.map((instruction, index) => {
                return instruction.optional ? (
                  <li key={index} className="my-2">
                    <span className="mr-2">{index + 1}.</span>{" "}
                    {instruction.instructions}{" "}
                    <span className="italic">(optional)</span>
                  </li>
                ) : (
                  <li key={index} className="my-2">
                    <span className="mr-2">{index + 1}.</span>{" "}
                    {instruction.instructions}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

         <Link to="/" className="w-full contents">     
        <button
          className="mt-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
        >
          Back
        </button>
        </Link>

        <Link
          className="bg-yellow-200 text-bg-yellow-700 p-2 text-center mb-20 hover:text-yellow-800 hover:bg-yellow-100"
          to={`/edit/${recipe.uuid}`}
        >
          Edit Recipe
        </Link>
      </div>
    </div>
}
</>
  );
}
