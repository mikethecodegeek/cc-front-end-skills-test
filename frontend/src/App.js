import './App.css';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Footer from './components/Footer';
import CreateRecipe from './components/CreateRecipe';
import EditRecipe from './components/EditRecipe'
import RecipeCard from './components/RecipeCard'

import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
     {/* <Recipes /> */}
     <Switch>
          <Route path="/create" >
            <CreateRecipe />
          </Route>

          <Route path="/edit/:uuid" 
            render={props => <EditRecipe {...props} />}
          />
   
          
          <Route path="/recipe/:uuid" 
            render={props => <RecipeCard {...props} />}
         />
          <Route path="/">
            <Recipes />
          </Route>
      </Switch>
     <Footer />
    </div>
  );
}

export default App;
