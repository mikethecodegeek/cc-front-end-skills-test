import React,{ useState, useEffect } from 'react'
import moment from 'moment'
import uuid from 'react-uuid'
import {useQuery} from 'react-query'


export default function EditRecipe( {  ...props }) {
    const [recipe,setRecipe] = useState('')
    const [cookTime,setCookTime] = useState('')
    const [prepTime,setPrepTime] = useState('')
    const [servings,setServings] = useState('')
    const [title,setTitle] = useState('')
    const [ingredients,setIngredients] = useState('')
    const [directions,setDirections] = useState('')
    const [description,setDescription] = useState('')
    const [newIngredientName, setNewIngredientName] = useState('')
    const [newIngredientAmount, setNewIngredientAmount] = useState('')
    const [newIngredientMeasurement, setNewIngredientMeasurement] = useState('')
    const [newDirectionInstruction, setNewInstruction] = useState('')
    const [newDirectionOptional, setOptional] = useState(false)

    const getRecipe = async () => {
        const response = await fetch(`/recipes/${props.match.params.uuid}`)
        const data = await response.json()
        // console.log(data)
        setRecipe(data)
        return data;
    }

    const { data, status } = useQuery('recipe', getRecipe, {onSuccess:data=>console.log(data)}) 
     
    console.log(status)
    // console.log(data)
    const handleSubmit  = async (e) => {
        e.preventDefault()
        const editDate = moment().format('M/d/yyyy, h:mm a')
        const newRecipe = {
            cookTime:recipe.cookTime,
            prepTime:recipe.prepTime,
            servings:recipe.servings,
            title:recipe.title,
            ingredients:recipe.ingredients,
            directions:recipe.directions,
            description:recipe.description,
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

    useEffect(()=> {
        setCookTime(recipe.cookTime)
    },[recipe])

    useEffect(()=>{
        setNewIngredientAmount('')
        setNewIngredientName('')
        setNewIngredientMeasurement('')
    },[recipe.ingredients])

    useEffect(()=>{
        setNewInstruction('')
        setOptional(false)
        console.log(directions)
    },[recipe.directions])


    const addIngredient = e => {
        e.preventDefault()
        
        const newIngredientObj = {
            id: uuid(),
            name: newIngredientName,
            amount: newIngredientAmount,
            measurement: newIngredientMeasurement
        }
        let newState = new Object(recipe)
        newState.ingredients.push(newIngredientObj)
        setRecipe({...recipe,ingredients:[...newState.ingredients]})
    }

    const addInstruction = e => {
        e.preventDefault()
        console.log(newDirectionInstruction,newDirectionOptional)
        const newInstructionObj = {
            instructions: newDirectionInstruction,
            optional: newDirectionOptional,
        }
        let newInstruction = new Object(recipe)
        newInstruction.directions.push(newInstructionObj)
        setRecipe({...recipe,directions:[...newInstruction.directions]})
    }

    const changeIngredient = (indx,name) => {
        const newIngredients = [...ingredients]
        newIngredients[indx].name = name
        setIngredients(newIngredients)
    }

    const removeIngredient = (indx) => {
        const newIngredients = [...recipe.ingredients]
        newIngredients.splice(indx,1)
        setRecipe({...recipe,ingredients:newIngredients})
    }

    const removeStep = (indx) => {
        const newDirections = [...recipe.directions]
        newDirections.splice(indx,1)
        setRecipe({...recipe,directions:newDirections})
    }

    return (
        <>
        {status === "loading" &&
            <p>Getting recipe </p>
        }
            {status === 'success' &&
            <>
            <h2 className="text-center text-2xl">Edit Recipe</h2>
            <div className="flex justify-center">
                <form className="flex flex-col mb-20 ml-20 mt-5 w-2/3 shadow-xl p-10" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mb-2 flex flex-col">
                    <label>Title</label>
                    <input className="mt-2 outline border-solid p-2" type="text" value={recipe.title} onChange={(e) => setRecipe({...recipe,title:e.target.value})}/>
                    </div>
                    <div className="mb-2 flex flex-col">
                    <label>Description</label>
                    <input className="mt-2 outline border-solid p-2" type="text" value={recipe.description} onChange={(e) => setRecipe({...recipe,description:e.target.value})}/>
                    </div>
                    <div className="mb-2 flex flex-col">
                    <label>Prep Time</label>
                    <input className="mt-2 outline border-solid p-2" type="text" value={recipe.prepTime} onChange={(e) => setRecipe({...recipe,prepTime:e.target.value})}/>
                    </div>
                    <div className="mb-2 flex flex-col">
                    <label>Cook Time</label>
                    <input className="mt-2 outline border-solid p-2" type="text" value={recipe.cookTime} onChange={(e) => setRecipe({...recipe,cookTime:e.target.value})}/>
                    </div>
                    <div className="mb-2 flex flex-col">
                    <label>Servings</label>
                    <input className="mt-2 outline border-solid p-2" type="text" value={recipe.servings} onChange={(e) => setRecipe({...recipe,servings:e.target.value})}/>
                    </div>
                    <div className="mb-2 flex flex-col">
                    <label className="bold">Ingredients (add 1 at a time and press add ingredient)</label>
                    { recipe.ingredients.map( (ingredient,index) => <div className="bg-gray-200 mb-3 flex items-center justify-between w-full pl-2"><span key={index}>{ingredient.name}</span> <button className="p-2 bg-red-500 text-white hover:bg-red-700" onClick={()=>removeIngredient(index)}>Remove</button> </div>)}
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
                   
                    { recipe.directions.map( (direction,index) => <div className="bg-gray-200 mb-3 flex items-center justify-between w-full pl-2"><span key={index}>{direction.instructions}</span> <button className="p-2 bg-red-500 text-white hover:bg-red-700" onClick={()=>removeStep(index)}>Remove</button> </div>)}
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
        }
        </>
    )
}
