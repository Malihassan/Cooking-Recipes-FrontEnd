import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/nav/Navbar";
import AddRecipe from "./pages/addRecipe.js/AddRecipe";
import Home from "./pages/recipes/Recipes";
import RecipeDetails from "./pages/recipeDetails/RecipeDetails";
import Loader from "./components/shared/loader/Loader";
import UpdateRecipe from "./pages/updateRecipe/UpdateRecipe"
function App() {
  return (
    <>
      <Loader/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/recipe/:id" element={<RecipeDetails />}></Route>
        <Route path="/updateRecipe/:id" element={<UpdateRecipe/>}></Route>
        <Route path="/addRecipe" element={<AddRecipe />}></Route>
      </Routes>
    </>
  );
}

export default App;
