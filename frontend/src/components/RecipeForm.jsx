import React, { useState, useEffect } from "react";
import moment from "moment";
import uuid from "react-uuid";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";

export default function RecipeForm({ handleSubmit, ...props }) {
  const [recipe, setRecipe] = useState(props.recipe)
  const [newIngredient,setNewIngredient] = useState({name:'',amount:'',measurement:''})
  const [newDirection,setNewDirection] = useState({instructions:'',optional:false})
  const [submitError, setSubmitError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setNewIngredient({name:'',amount:'',measurement:''});
  }, [recipe.ingredients]);

  useEffect(() => {
    setNewDirection({instructions:'',optional:false})
  }, [recipe.directions]);

  const addIngredient = (e) => {
    e.preventDefault();

    const newIngredientObj = {
      id: uuid(),
      name: newIngredient.name,
      amount: newIngredient.amount,
      measurement: newIngredient.measurement
    };

    let newState = [...recipe.ingredients];
    newState.push(newIngredientObj);
    setRecipe({ ...recipe, ingredients: [...newState] });
  };

  const addInstruction = (e) => {
    e.preventDefault();
    const newInstructionObj = {
      instructions: newDirection.instructions,
      optional: newDirection.optional,
    };
    let newInstruction = [...recipe.directions];
    newInstruction.push(newInstructionObj);
    setRecipe({ ...recipe, directions: [...newInstruction] });
  };

  const removeIngredient = (e, indx) => {
    e.preventDefault();
    const allIngredients = [...recipe.ingredients];
    allIngredients.splice(indx, 1);
    setRecipe({ ...recipe, ingredients: allIngredients });
  };

  const removeStep = (e, indx) => {
    e.preventDefault();
    const newDirections = [...recipe.directions];
    newDirections.splice(indx, 1);
    setRecipe({ ...recipe, directions: newDirections });
  };

  const handleErrors = (e,recipe) => {
      e.preventDefault()
      if (recipe.ingredients.length === 0) {
        setSubmitError('There are no ingredients. Please add at least one')
        return
    } 

    if (recipe.directions.length === 0) {
        setSubmitError('There are no instructions. Please add at least one')
        return
    } 
    setSubmitError(false)
    handleSubmit(e,recipe)
  }


  return (
    
     
    
        <>
          <h2 className="text-center text-2xl">Edit Recipe</h2>
          <div className="flex justify-center">
            <form
              className="flex flex-col mb-20 ml-20 mt-5 w-2/3 shadow-xl p-10"
              onSubmit={(e) => handleErrors(e,recipe)}
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
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({...newIngredient,name:e.target.value})}
                  />
                  <label>Amount</label>
                  <input
                    className="outline border-solid p-2"
                    type="text"
                    value={newIngredient.amount}
                    onChange={(e) => setNewIngredient({...newIngredient,amount:e.target.value})}
                  />
                  <label>Measurement</label>
                  <input
                    className="outline border-solid p-2"
                    type="text"
                    value={newIngredient.measurement}
                    onChange={(e) =>
                      setNewIngredient({...newIngredient,measurement:e.target.value})
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
                      checked={newDirection.optional}
                      onChange={(e) => setNewDirection({...newDirection,optional:e.target.checked})}
                    />
                  </div>
                </div>
                <textarea
                  className="outline border-solid p-2"
                  type="text"
                  value={newDirection.instructions}
                  onChange={(e) => setNewDirection({...newDirection,instructions:e.target.value})}
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
                <Link to={`/recipe/${recipe.uuid}`}
                  className="ml-5 bg-yellow-300 text-yellow-700 p-3 hover:bg-gray-700"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </>
  );
}
