import './App.css';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Footer from './components/Footer';
import CreateRecipe from './components/CreateRecipe';
import EditRecipe from './components/EditRecipe'

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
          <Route path="/edit" 
            render={props => <EditRecipe recipe={"hi"} {...props} />}
          >
            
          </Route>
          <Route path="/">
            <Recipes />
          </Route>
      </Switch>
     <Footer />
    </div>
  );
}

export default App;
