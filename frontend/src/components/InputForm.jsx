import { useState } from "react";

export default function InputForm({ setRecipe }) {
    const [ingredients, setIngredients] = useState("");
    const [preference, setPreference] = useState("none");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("http://localhost:8000/generate-recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ingredients: ingredients.split(",").map((item) => item.trim()),
                preference,
            }),
        });

        const data = await res.json();
        setRecipe(data.recipe);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-lg font-medium">
                Ingredients (comma separated):
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="e.g. tomato, bread, cheese"
                />
            </label>

            <label className="block text-lg font-medium">
                Preference:
                <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <option value="none">None</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="microwave-only">Microwave Only</option>
                </select>
            </label>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
                disabled={loading}
            >
                {loading ? "Cooking..." : "Generate Recipe"}
            </button>
        </form>
    );
}


// import { useState } from "react";

// export default function InputForm({ onSubmit }) {
//     const [ingredients, setIngredients] = useState("");
//     const [preference, setPreference] = useState("none");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!ingredients) return;
//         const ingredientList = ingredients.split(",").map(i => i.trim());
//         onSubmit({ ingredients: ingredientList, preference });
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <textarea
//                 className="w-full p-2 border rounded"
//                 rows={3}
//                 placeholder="Enter ingredients (comma-separated)"
//                 value={ingredients}
//                 onChange={(e) => setIngredients(e.target.value)}
//             />

//             <select
//                 className="w-full p-2 border rounded"
//                 value={preference}
//                 onChange={(e) => setPreference(e.target.value)}
//             >
//                 <option value="none">No Preference</option>
//                 <option value="vegan">Vegan</option>
//                 <option value="vegetarian">Vegetarian</option>
//                 <option value="microwave-only">Microwave-only</option>
//             </select>

//             <button
//                 type="submit"
//                 className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//             >
//                 Generate Recipe
//             </button>
//         </form>
//     );
// }
