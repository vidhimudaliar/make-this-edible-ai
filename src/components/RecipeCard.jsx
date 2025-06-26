export default function RecipeCard({ recipe }) {
    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
            <p className="text-sm text-gray-600 mb-2">Time: {recipe.time}</p>

            <h3 className="font-semibold">Ingredients:</h3>
            <ul className="list-disc list-inside mb-2">
                {recipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            <h3 className="font-semibold">Steps:</h3>
            <ol className="list-decimal list-inside space-y-1">
                {recipe.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                ))}
            </ol>
        </div>
    );
}
