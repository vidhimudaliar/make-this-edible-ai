import { useState } from "react";
import InputForm from "./components/InputForm";
import RecipeCard from "./components/RecipeCard";

export default function App() {
  const [recipe, setRecipe] = useState(null);

  return (
    <div className="min-h-screen bg-yellow-50 p-6 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8">🥕 MakeThisEdible.ai</h1>
      <InputForm setRecipe={setRecipe} />
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
}
