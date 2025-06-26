import { useState } from "react";

export default function InputForm({ setRecipe }) {
    const [ingredients, setIngredients] = useState("");
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [microwaveOnly, setMicrowaveOnly] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // For Week 1: just mock a recipe
        const mockRecipe = {
            title: "Microwave Veggie Bowl",
            time: "10 mins",
            ingredients: ["rice", "frozen veggies", "soy sauce"],
            steps: [
                "Microwave rice.",
                "Add veggies and microwave again.",
                "Mix with soy sauce and enjoy!"
            ],
        };

        setRecipe(mockRecipe);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
            <label className="block">
                <span className="text-lg font-medium">What ingredients do you have?</span>
                <input
                    type="text"
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    placeholder="e.g., eggs, rice, spinach"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
            </label>

            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isVegetarian}
                        onChange={(e) => setIsVegetarian(e.target.checked)}
                    />
                    Vegetarian
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={microwaveOnly}
                        onChange={(e) => setMicrowaveOnly(e.target.checked)}
                    />
                    Microwave only
                </label>
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
                Generate Recipe
            </button>
        </form>
    );
}
