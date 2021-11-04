import React, { useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import RecipeForm from "./RecipeForm";

export default function EditRecipe({ ...props }) {
  const [recipe, setRecipe] = useState({});
  const history = useHistory();

  const getRecipe = async () => {
    const response = await fetch(`/recipes/${props.match.params.uuid}`);
    const data = await response.json();
    return data;
  };

  const { status } = useQuery("recipe", getRecipe, {
    onSuccess: (data) => setRecipe(data),
  });

  const handleSubmit = async (e,recipe) => {
    e.preventDefault();
    const editDate = moment().format("M/d/yyyy, h:mm a");
    const newRecipe = {
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      title: recipe.title,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      description: recipe.description,
      editDate,
    };

    const response = await fetch(`/recipes/${recipe.uuid}`, {
      method: "PATCH",
      body: JSON.stringify(newRecipe),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    history.push(`/recipe/${recipe.uuid}`);
    return data;
  };



  return (
    <>
      {status === "loading" && <p>Getting recipe </p>}
      {recipe.title && (
          <>
         <h2 className="text-center text-2xl">Edit Recipe</h2>
         <RecipeForm recipe={recipe} link='/recipe/' handleSubmit={handleSubmit} />
         </>
      )}
    </>
  );
}
