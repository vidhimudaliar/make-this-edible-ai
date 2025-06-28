export default function RecipeCard({ text }) {
    if (!text) return null;

    return (
        <div className="mt-6 p-4 bg-white border rounded shadow whitespace-pre-wrap">
            {text}
        </div>
    );
}

