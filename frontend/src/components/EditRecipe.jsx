import React,{ useState } from 'react'
import moment from 'moment'

export default function EditRecipe( { recipe, ...props }) {
    console.log(recipe, props)
    // let recipe = {}
    const [cookTime,setCookTime] = useState(recipe.cookTime)
    const [prepTime,setPrepTime] = useState(recipe.prepTime)
    const [servings,setServings] = useState(recipe.servings)
    const [title,setTitle] = useState(recipe.title)
    const [ingredients,setIngredients] = useState(recipe.ingredients)
    const [directions,setDirections] = useState(recipe.directions)
    const [description,setDescription] = useState(recipe.description)

    const handleSubmit  = async (e) => {
        e.preventDefault()
        const editDate = moment().format('M/d/yyyy, h:mm a')
        const newRecipe = {
            cookTime,
            prepTime,
            servings,
            title,
            ingredients,
            directions,
            description,
            editDate
        }
        

        const response = await fetch(`/recipes/${recipe.uuid}`, {
            method: 'PATCH',
            body: JSON.stringify(newRecipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data

    }

    const changeIngredient = (indx,name) => {
        const newIngredients = [...ingredients]
        newIngredients[indx].name = name
        setIngredients(newIngredients)
    }

    return (
        <>
            <form className="flex flex-col mb-20" onSubmit={(e)=>handleSubmit(e)}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label>Prep Time</label>
                <input type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}/>
                <label>Cook Time</label>
                <input type="text" value={cookTime} onChange={(e) => setCookTime(e.target.value)}/>
                <label>Servings</label>
                <input type="text" value={servings} onChange={(e) => setServings(e.target.value)}/>
                <label>Ingredients</label>
                {
                recipe.ingredients.map( (ingredient,index) => (
                    <div>
                     <input key={ingredient.uuid} type="text" value={ingredient.name} onChange={(e) => setIngredients(e.target.value)}/>
                     
                    </div>
                ))
                }
                
                <label>Directions</label>
                {
                    recipe.directions.map( (direction,index) => <input key={index} type="text" value={direction.instructions} onChange={(e) => setDirections(e.target.value)}/>)
                }
                <button>Submit</button>
            </form>
        </>
    )
}
