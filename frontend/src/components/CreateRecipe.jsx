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
                <div className="mb-2 flex flex-col">
                <label>Title</label>
                <input className="mt-2 outline border-solid p-2" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="mb-2 flex flex-col">
                <label>Description</label>
                <input className="mt-2 outline border-solid p-2" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="mb-2 flex flex-col">
                <label>Prep Time</label>
                <input className="mt-2 outline border-solid p-2" type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}/>
                </div>
                <div className="mb-2 flex flex-col">
                <label>Cook Time</label>
                <input className="mt-2 outline border-solid p-2" type="text" value={cookTime} onChange={(e) => setCookTime(e.target.value)}/>
                </div>
                <div className="mb-2 flex flex-col">
                <label>Servings</label>
                <input className="mt-2 outline border-solid p-2" type="text" value={servings} onChange={(e) => setServings(e.target.value)}/>
                </div>
                <div className="mb-2 flex flex-col">
                <label className="bold">Ingredients (add 1 at a time and press add ingredient)</label>
                { ingredients.map(ingredient => <span>{ingredient.name}</span>)}
                <div className="flex flex-col">
                
                <label>Name</label>
                <input className="outline border-solid p-2" type="text" value={newIngredientName} onChange={(e) => setNewIngredientName(e.target.value)}/>
                <label>Amount</label>
                <input className="outline border-solid p-2" type="text" value={newIngredientAmount} onChange={(e) => setNewIngredientAmount(e.target.value)}/>
                <label>Measurement</label>
                <input className="outline border-solid p-2" type="text" value={newIngredientMeasurement} onChange={(e) => setNewIngredientMeasurement(e.target.value)}/>
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white text-lg mt-5 w-40 p-3" onClick={e=>addIngredient(e)}>Add Ingredient</button>
                </div>
                <div className="mb-2 flex flex-col">
                <label className="font-bold">Directions</label>
                { directions.map(direction => <span>{direction.instructions}</span>)}
                {/* <div> */}
                <label>Instruction</label>
                <textarea className="outline border-solid p-2" type="text" value={newDirectionInstruction} onChange={(e) => setNewInstruction(e.target.value)}/>
                <label>Optional?</label>
                <input className="ml-5" type="checkbox" checked={newDirectionOptional} onChange={(e) => setOptional(e.target.checked)}/>
                {/* </div> */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg mt-5 w-40 p-3" onClick={e=>addInstruction(e)}>Add Instruction</button>
                </div>
                <div>
                <button className="bg-black text-white p-3 hover:bg-gray-700">Submit</button>
                </div>
            </form>
            </div>
        </>
    )
}