import React from 'react'

export default function RecipeListCard( {recipe, showSelectedRecipe, listImage } ) {
    return (
        <div onClick={()=>showSelectedRecipe(recipe)} className="mt-10 shadow-md sm:flex sm:flex-col sm:justify-center m-10 p-10 cursor-pointer">
            <h3 className="text-center mb-5 font-bold text-xl">{recipe.title}</h3>
            <img src={listImage} alt={recipe.name} />
            <p className="text-center mt-5">Click to see recipe details!</p>
        </div>
    )
}
