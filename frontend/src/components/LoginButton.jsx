// /frontend/src/components/LoginButton.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

function LoginButton({ setUser }) {
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-4"
        >
            Sign in with Google
        </button>
    );
}

export default LoginButton;
