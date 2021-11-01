import React from 'react'

export default function RecipeListCard( {recipe, showSelectedRecipe, listImage } ) {
    return (
        <div onClick={()=>showSelectedRecipe(recipe)}>
            <h3>{recipe.title}</h3>
            <img src={listImage} alt={recipe.name} />
            <p>Click to see recipe details!</p>
        </div>
    )
}
