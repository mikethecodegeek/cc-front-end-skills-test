import React, { useState, useEffect } from "react";
import moment from "moment";
import uuid from "react-uuid";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

export default function EditRecipe({ ...props }) {
  const [recipe, setRecipe] = useState({});
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientAmount, setNewIngredientAmount] = useState("");
  const [newIngredientMeasurement, setNewIngredientMeasurement] = useState("");
  const [newDirectionInstruction, setNewInstruction] = useState("");
  const [newDirectionOptional, setOptional] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const history = useHistory();

  const getRecipe = async () => {
    const response = await fetch(`/recipes/${props.match.params.uuid}`);
    const data = await response.json();
    return data;
  };

  const { status } = useQuery("recipe", getRecipe, {
    onSuccess: (data) => setRecipe(data),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipe.ingredients.length === 0) {
        setSubmitError('There are no ingredients. Please add at least one')
        return
    } 

    if (recipe.directions.length === 0) {
        setSubmitError('There are no instructions. Please add at least one')
        return
    } 
    setSubmitError(false)
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

  useEffect(() => {
    setNewIngredientAmount("");
    setNewIngredientName("");
    setNewIngredientMeasurement("");
  }, [recipe.ingredients]);

  useEffect(() => {
    setNewInstruction("");
    setOptional(false);
  }, [recipe.directions]);

  const addIngredient = (e) => {
    e.preventDefault();

    const newIngredientObj = {
      id: uuid(),
      name: newIngredientName,
      amount: newIngredientAmount,
      measurement: newIngredientMeasurement,
    };
    let newState = [...recipe.ingredients];
    newState.push(newIngredientObj);
    setRecipe({ ...recipe, ingredients: [...newState] });
  };

  const addInstruction = (e) => {
    e.preventDefault();
    const newInstructionObj = {
      instructions: newDirectionInstruction,
      optional: newDirectionOptional,
    };
    let newInstruction = [...recipe.directions];
    newInstruction.push(newInstructionObj);
    setRecipe({ ...recipe, directions: [...newInstruction] });
  };

  const removeIngredient = (e, indx) => {
    e.preventDefault();
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(indx, 1);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const removeStep = (e, indx) => {
    e.preventDefault();
    const newDirections = [...recipe.directions];
    newDirections.splice(indx, 1);
    setRecipe({ ...recipe, directions: newDirections });
  };

  const handleBack = (e) => {
    e.preventDefault();
    history.push(`/recipe/${recipe.uuid}`);
  };

  return (
    <>
      {status === "loading" && <p>Getting recipe </p>}
      {recipe.title && (
        <>
          <h2 className="text-center text-2xl">Edit Recipe</h2>
          <div className="flex justify-center">
            <form
              className="flex flex-col mb-20 ml-20 mt-5 w-2/3 shadow-xl p-10"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mb-2 flex flex-col">
                <label>Title</label>
                <input
                  className="mt-2 outline border-solid p-2"
                  type="text"
                  value={recipe.title}
                  onChange={(e) =>
                    setRecipe({ ...recipe, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label>Description</label>
                <input
                  className="mt-2 outline border-solid p-2"
                  type="text"
                  value={recipe.description}
                  onChange={(e) =>
                    setRecipe({ ...recipe, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label>Prep Time</label>
                <input
                  className="mt-2 outline border-solid p-2"
                  type="text"
                  value={recipe.prepTime}
                  onChange={(e) =>
                    setRecipe({ ...recipe, prepTime: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label>Cook Time</label>
                <input
                  className="mt-2 outline border-solid p-2"
                  type="text"
                  value={recipe.cookTime}
                  onChange={(e) =>
                    setRecipe({ ...recipe, cookTime: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label>Servings</label>
                <input
                  className="mt-2 outline border-solid p-2"
                  type="text"
                  value={recipe.servings}
                  onChange={(e) =>
                    setRecipe({ ...recipe, servings: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label className="bold">
                  Ingredients (add 1 at a time and press add ingredient)
                </label>
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 mb-3 flex items-center justify-between w-full pl-2"
                  >
                    <span>{ingredient.name}</span>{" "}
                    <button
                      className="p-2 bg-red-500 text-white hover:bg-red-700"
                      onClick={(e) => removeIngredient(e, index)}
                    >
                      Remove
                    </button>{" "}
                  </div>
                ))}
                <div className="flex flex-col">
                  <label>Name</label>
                  <input
                    className="outline border-solid p-2"
                    type="text"
                    value={newIngredientName}
                    onChange={(e) => setNewIngredientName(e.target.value)}
                  />
                  <label>Amount</label>
                  <input
                    className="outline border-solid p-2"
                    type="text"
                    value={newIngredientAmount}
                    onChange={(e) => setNewIngredientAmount(e.target.value)}
                  />
                  <label>Measurement</label>
                  <input
                    className="outline border-solid p-2"
                    type="text"
                    value={newIngredientMeasurement}
                    onChange={(e) =>
                      setNewIngredientMeasurement(e.target.value)
                    }
                  />
                </div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white text-lg mt-5 w-40 p-3"
                  onClick={(e) => addIngredient(e)}
                >
                  Add Ingredient
                </button>
              </div>
              <div className="mb-2 flex flex-col">
                <label className="font-bold">Directions</label>

                {recipe.directions.map((direction, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 mb-3 flex items-center justify-between w-full pl-2"
                  >
                    <span>{direction.instructions}</span>{" "}
                    <button
                      className="p-2 bg-red-500 text-white hover:bg-red-700"
                      onClick={(e) => removeStep(e, index)}
                    >
                      Remove
                    </button>{" "}
                  </div>
                ))}
                <div className="flex">
                  <label>Instruction</label>
                  <div className="ml-10 mb-2">
                    <label className="italic">Optional?</label>

                    <input
                      className="ml-5"
                      type="checkbox"
                      checked={newDirectionOptional}
                      onChange={(e) => setOptional(e.target.checked)}
                    />
                  </div>
                </div>
                <textarea
                  className="outline border-solid p-2"
                  type="text"
                  value={newDirectionInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                />

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-lg mt-5 w-40 p-3"
                  onClick={(e) => addInstruction(e)}
                >
                  Add Instruction
                </button>
              </div>
              {submitError &&
            <p className="text-red-700 text-center my-5 font-bold">{submitError}</p>
            }
              <div>
                <button className="bg-black text-white p-3 hover:bg-gray-700">
                  Submit
                </button>
                <button
                  onClick={(e) => handleBack(e)}
                  className="ml-5 bg-yellow-300 text-yellow-700 p-3 hover:bg-gray-700"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
