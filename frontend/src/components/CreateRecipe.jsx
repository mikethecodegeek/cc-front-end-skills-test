import React from "react";
import uuid from "react-uuid";
import moment from "moment";
import { useHistory } from "react-router";
import RecipeForm from "./RecipeForm";

export default function CreateRecipe() {
 
  const history = useHistory();


  const handleSubmit = async (e,recipe) => {
    e.preventDefault();

    const images = {
      full: "",
      medium: "",
      small: "",
    };

    let newUuid = uuid();
    const postDate = moment().format("M/d/yyyy, h:mm a");
    const editDate = moment().format("M/d/yyyy, h:mm a");
    const newRecipe = {
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      title: recipe.title,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      description: recipe.description,
      images,
      postDate,
      editDate,
      uuid: newUuid,
    };

    const response = await fetch(`/recipes`, {
      method: "POST",
      body: JSON.stringify(newRecipe),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    history.push(`/`);
    return data;
  };

  return (
    <>
      <h2 className="text-center text-2xl">Add a New Recipe</h2>
        <RecipeForm recipe={{ingredients:[],directions:[]}} link='/' handleSubmit={handleSubmit} />
    </>
  );
}
