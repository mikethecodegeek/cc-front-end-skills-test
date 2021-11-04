import React,{useState} from 'react'
import {useQuery} from 'react-query'
import RecipeListCard from './RecipeListCard'
import RecipeCard from './RecipeCard'
import Searchbar from './Searchbar'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export default function Recipes() {
    const [recipes,setRecipes] = useState([])
    const [allRecipes,setAllRecipes] = useState([])
    const [currentRecipe, setCurrentRecipe]=useState({})
    const [showRecipe, setShowRecipe] = useState(false)
 
    
    const getRecipes = async () => {
        const response = await fetch('/recipes')
        const data = await response.json()
        setRecipes(data)
        setAllRecipes(data)
        return data
    }

    const showSelectedRecipe = (recipe) => {
        setCurrentRecipe(recipe)
        setShowRecipe(true)
    }
    const { status } = useQuery('recipes', getRecipes)
    
    return (
        <>
      
        {!showRecipe &&
        <div className="mb-20">
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
          <>
             <div className="bg-black uppercase p-5 text-center">
            <h2 className="text-white text-2xl bold">Recipes</h2>
        </div>
            <Router>
              <Link className="mt-5 ml-10 p-5 bg-blue-500 relative top-10 text-white text-xl hover:bg-blue-700" to='/create'>Add New Recipe</Link>
            </Router>
              <Searchbar recipes={allRecipes} setRecipes={setRecipes} />
              {recipes.length > 0 &&
            <div className="md:grid lg:grid-cols-3 md:grid-cols-2">
              {recipes.map(recipe => (
                <Link to={`/recipe/${recipe.uuid}`} key={recipe.uuid}>
                <RecipeListCard
                recipe = {recipe} recipeName={recipe.title} listImage={recipe.images.full || ''} />
               
              </Link>
              ))}
            </div>
          }
          { recipes.length === 0 &&
            <div>
              <p className="text-center text-xl italic mb-20">No recipes found </p>
            </div>
          }
            </>
          }
        </div>
        }
        {showRecipe && 
            <RecipeCard recipe={currentRecipe} closeRecipe={setShowRecipe} />
        }
        
        </>
    )
}
