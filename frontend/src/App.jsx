// /frontend/src/App.jsx
import { useState } from "react";
import InputForm from "./components/InputForm";
import RecipeCard from "./components/RecipeCard";
import LoginButton from "./components/LoginButton";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [preference, setPreference] = useState("none");
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    setLoading(true);
    setRecipe(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, preference }),
      });
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">
        🥕 MakeThisEdible.ai
      </h1>

      {/* Login Section */}
      {!user ? (
        <div className="text-center">
          <LoginButton setUser={setUser} />
        </div>
      ) : (
        <div className="text-center mb-4">
          <p className="text-lg">
            Welcome, <span className="font-semibold">{user.displayName}</span>!
          </p>
          <img
            src={user.photoURL}
            alt="profile"
            className="w-12 h-12 rounded-full mx-auto mt-2"
          />
        </div>
      )}

      {/* Input Form */}
      <InputForm
        ingredients={ingredients}
        setIngredients={setIngredients}
        preference={preference}
        setPreference={setPreference}
        generateRecipe={generateRecipe}
      />

      {/* Recipe Card */}
      {loading && (
        <p className="text-center text-orange-500 font-medium mt-6">
          Cooking up a recipe...
        </p>
      )}
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  );
}

export default App;



// import React, { useState } from "react";
// import InputForm from "./components/InputForm";
// import RecipeCard from "./components/RecipeCard";
// import axios from "axios";

// export default function App() {
//   const [recipeText, setRecipeText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async ({ ingredients, preference }) => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8000/generate-recipe", {
//         ingredients,
//         preference
//       });
//       setRecipeText(res.data.recipe);
//     } catch (err) {
//       console.error(err);
//       setRecipeText("Something went wrong. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4 space-y-4">
//       <h1 className="text-3xl font-bold text-center">🥕 MakeThisEdible.ai</h1>
//       <InputForm onSubmit={handleGenerate} />
//       {loading ? (
//         <p className="text-center text-sm text-gray-500">Loading your recipe...</p>
//       ) : (
//         <RecipeCard text={recipeText} />
//       )}
//     </div>
//   );
// }

