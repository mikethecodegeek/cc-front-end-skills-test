import React, { useState} from 'react'
import { useQuery } from 'react-query'

export default function RecipeCard( {recipe, closeRecipe} ) {
    const [specials,setSpecials] = useState([])
    const getRecipes = async () => {
        const response = await fetch('/specials')
        const data = await response.json()
        setSpecials(data)
        console.log(data)
        return data
    }

    const { data, status } = useQuery('recipes', getRecipes)
//     Ingredients with a matching ingredientId listed in the
//  specials response should also show the special title, type and 
//  text under the ingredient name
// Bonus: Create a view to add and update recipes or specials. 
// Image upload not required. 
// Both endpoints support GET, POST and PATCH.
// Bonus: Create a view to add and update recipes or specials.
    return (
        <div className='recipeCard'>
            <h2>{recipe.title}</h2>
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
                    return (
                        <>
                        <li key={ingredient.uuid}>{index+1}. {ingredient.amount} {ingredient.measurement} {ingredient.name}</li>
                       { 
                       specials.map(special => {
                            if(special.ingredientId === ingredient.uuid) {
                                return (
                                    <h4 key={special.uuid}>{special.title} {special.type} {special.text}</h4>
                                )
                            }
                        })
                       }
                        
                       
                        </>
                    )
                })}
            </ul>
            <h3>Post Date: {recipe.postDate}</h3>
            <h3>Edit Date: {recipe.editDate}</h3>
            <img src={recipe.images.medium} alt={recipe.name}/>   
            <button onClick={()=>closeRecipe(false)}>Back</button> 
        </div>
    )
}
