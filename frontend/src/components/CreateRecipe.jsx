import React,{ useState, useEffect } from 'react'
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
    const [newIngredientName, setNewIngredientName] = useState('')
    const [newIngredientAmount, setNewIngredientAmount] = useState('')
    const [newIngredientMeasurement, setNewIngredientMeasurement] = useState('')
    const [newDirectionInstruction, setNewInstruction] = useState('')
    const [newDirectionOptional, setOptional] = useState(false)

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

    useEffect(()=>{
        setNewIngredientAmount('')
        setNewIngredientName('')
        setNewIngredientMeasurement('')
    },[ingredients])

    useEffect(()=>{
        setNewInstruction('')
        setOptional(false)
        console.log(directions)
    },[directions])


    const addIngredient = e => {
        e.preventDefault()
        
        const newIngredientObj = {
            id: uuid(),
            name: newIngredientName,
            amount: newIngredientAmount,
            measurement: newIngredientMeasurement
        }
        setIngredients([...ingredients, newIngredientObj])
       
    }

    const addInstruction = e => {
        e.preventDefault()
        console.log(newDirectionInstruction,newDirectionOptional)
        const newInstructionObj = {
            instructions: newDirectionInstruction,
            optional: newDirectionOptional,
        }
        setDirections([...directions, newInstructionObj])
    }

    return (
        <>
        <h2 className="text-center text-2xl">Add a New Recipe</h2>
        <div className="flex justify-center">
            <form className="flex flex-col mb-20 ml-20 mt-5 w-2/3 shadow-xl p-10" onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-2">
                <label>Title</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="mb-2">
                <label>Description</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="mb-2">
                <label>Prep Time</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}/>
                </div>
                <div className="mb-2">
                <label>Cook Time</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={cookTime} onChange={(e) => setCookTime(e.target.value)}/>
                </div>
                <div className="mb-2">
                <label>Servings</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={servings} onChange={(e) => setServings(e.target.value)}/>
                </div>
                <div className="mb-2">
                <label>Ingredients</label>
                { ingredients.map(ingredient => <span>{ingredient.name}</span>)}
                <div>
              
                <label>Name</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={newIngredientName} onChange={(e) => setNewIngredientName(e.target.value)}/>
                <label>Amount</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={newIngredientAmount} onChange={(e) => setNewIngredientAmount(e.target.value)}/>
                <label>Measurement</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={newIngredientMeasurement} onChange={(e) => setNewIngredientMeasurement(e.target.value)}/>
                </div>
                <button onClick={e=>addIngredient(e)}>Add Ingredient</button>
                </div>
                <div className="mb-2">
                <label>Directions</label>
                { directions.map(direction => <span>{direction.instructions}</span>)}
                <label>Instruction</label>
                <input className="outline border-solid ml-5 p-1" type="text" value={newDirectionInstruction} onChange={(e) => setNewInstruction(e.target.value)}/>
                <label>Optional?</label>
                <input className="outline border-solid ml-5 p-1" type="checkbox" value={newDirectionOptional} onChange={(e) => setOptional(e.target.value)}/>
                <button onClick={e=>addInstruction(e)}>Add Instruction</button>
                </div>
                <div>
                <button className="bg-black text-white p-3 hover:bg-gray-700">Submit</button>
                </div>
            </form>
            </div>
        </>
    )
}