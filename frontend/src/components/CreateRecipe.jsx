import React,{ useState } from 'react'
import uuid from 'react-uuid'
import moment from 'moment'

export default function CreateRecipe() {
    const [cookTime,setCookTime] = useState('')
    const [prepTime,setPrepTime] = useState('')
    const [servings,setServings] = useState('')
    const [title,setTitle] = useState('')
    const [ingredients,setIngredients] = useState([])
    const [directions,setDirections] = useState([])
    const [description,setDescription] = useState('')

    const handleSubmit  = async (e) => {
        e.preventDefault()
        const images = {
            "full": "",
            "medium": "",
            "small": ""
          }
        
        let newUuid = uuid();
        const postDate = moment().format('M/d/yyyy, h:mm a')
        const editDate = moment().format('M/d/yyyy, h:mm a')
        const newRecipe = {
            cookTime,
            prepTime,
            servings,
            title,
            ingredients,
            directions,
            description,
            images,
            postDate,
            editDate,
            uuid:newUuid
        }

        const response = await fetch(`/recipes`, {
            method: 'POST',
            body: JSON.stringify(newRecipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data

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
                <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
                <label>Directions</label>
                <input type="text" value={directions} onChange={(e) => setDirections(e.target.value)}/>
                <button>Submit</button>
            </form>
        </>
    )
}