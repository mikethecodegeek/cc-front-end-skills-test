import React from 'react'

export default function RecipeListCard( {recipe, showSelectedRecipe, recipeName, listImage } ) {
    return (
        <div onClick={()=>showSelectedRecipe(recipe)}>
            <h3>{recipe.recipeName}</h3>
            <img src={listImage} alt={recipeName} />
            <p>Click to see recipe details!</p>
        </div>
    )
}
