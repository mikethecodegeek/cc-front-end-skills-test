import React,{useState} from 'react'
import {useQuery} from 'react-query'
import RecipeListCard from './RecipeListCard'
import RecipeCard from './RecipeCard'
export default function Recipes() {
    const [recipes,setRecipes] = useState([])
    const [currentRecipe, setCurrentRecipe]=useState({})
    const [showRecipe, setShowRecipe] = useState(false)
    
    const getRecipes = async () => {
        const response = await fetch('/recipes')
        const data = await response.json()
        setRecipes(data)
        console.log(data)
        return data
    }

    const showSelectedRecipe = (recipe) => {
        setCurrentRecipe(recipe)
        setShowRecipe(true)
    }
    const { data, status } = useQuery('recipes', getRecipes)
    
    return (
        <>
        {!showRecipe &&
        <div>
          { status === 'error' &&
            <div>
              Error
            </div>
          }
          { status === 'loading' &&
            <div>
              Loading
            </div>
          }
          { status === 'success' &&
            <div className="md:grid lg:grid-cols-3 md:grid-cols-2">
              {recipes.map(recipe => (
                <RecipeListCard key={recipe.uuid}
                recipe = {recipe} showSelectedRecipe={showSelectedRecipe} recipeName={recipe.title} listImage={recipe.images.full} />
               
              ))}
            </div>
          }
        </div>
        }
        {showRecipe && 
            <RecipeCard recipe={currentRecipe} closeRecipe={setShowRecipe} />
        }
        </>
    )
}
