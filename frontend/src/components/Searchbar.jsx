import React, {useState, useEffect} from 'react'

export default function Searchbar( {recipes, setRecipes}) {
    const [search, setSearch] = useState('')

    useEffect(()=> {
        if (search.length > 0) {
            let filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
            setRecipes(filteredRecipes || [{title: 'No recipes found'}])
        } else {
            setRecipes(recipes)
        }
    },[search, recipes, setRecipes])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="my-5 flex justify-center text-xl">
            <input className="p-5" value={search} onChange={(e)=>handleChange(e)} placeholder="Search for a recipe.."></input>
        </div>
    )
}
