import React from 'react'

export default function RecipeCard( {recipe} ) {
    return (
        <div className='recipeCard'>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>Cook Time: {recipe.cookTime}</p>
            <p>Prep time: {recipe.prepTime}</p>
            <p>Servings: {recipe.servings}</p>

            <h3>Instructions:</h3>
            <ul> 
                {recipe.directions.map((instruction, index) => {

                    return instruction.optional ? <li key={index}>{instruction.instructions} (optional)</li> : <li key={index}>{instruction.instructions}</li> 
                })}
            </ul>

            <h3>Ingredients:</h3>
            <ul> 
                {recipe.ingredients.map((ingredient, index) => {
                    return <li key={ingredient.uuid}>{index+1}. {ingredient.amount} {ingredient.measurement} {ingredient.name}</li>
                })}
            </ul>
            <h3>Post Date: {recipe.postDate}</h3>
            <h3>Edit Date: {recipe.editDate}</h3>
            <image src={recipe.images.medium} alt={recipe.name}/>    
        </div>
    )
}
