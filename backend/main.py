from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import google.generativeai as genai
from auth import verify_token  # 🔒 Firebase Auth checker

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-2.5-pro")  # ✅ Use a valid model name

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can lock this down later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory "database"
user_saved_recipes = {}

@app.get("/")
def root():
    return {"message": "MakeThisEdible.ai backend running!"}


# ✅ Public endpoint — no login needed
@app.post("/generate-recipe")
async def generate_recipe(request: Request):
    data = await request.json()
    ingredients = data.get("ingredients", [])
    preference = data.get("preference", "none").lower()

    preference_map = {
        "vegan": "Make sure the recipe is 100% vegan.",
        "vegetarian": "Make sure the recipe is vegetarian-friendly.",
        "microwave-only": "Only suggest recipes that can be cooked using a microwave.",
        "none": "You can be as creative as you'd like."
    }

    preference_instruction = preference_map.get(preference, preference_map["none"])

    prompt = f"""
You are a creative and helpful chef.
Your job is to suggest a recipe using only the following ingredients:
{', '.join(ingredients)}.

{preference_instruction}

Include:
- Recipe name
- Ingredients list
- Step-by-step instructions

Make it sound friendly and easy to follow.
"""

    try:
        response = model.generate_content(prompt)
        return {"recipe": response.text}
    except Exception as e:
        print("Gemini API error:", str(e))
        return {"error": "There was an error generating the recipe."}


# ✅ Protected endpoint — user must be logged in
@app.post("/save-recipe")
async def save_recipe(request: Request):
    uid = verify_token(request)  # 🔐 Authenticate user
    data = await request.json()
    recipe = data.get("recipe")

    if not recipe:
        raise HTTPException(status_code=400, detail="Missing recipe")

    # Store the recipe under the user
    if uid not in user_saved_recipes:
        user_saved_recipes[uid] = []
    user_saved_recipes[uid].append(recipe)

    return {"message": "Recipe saved!", "saved_count": len(user_saved_recipes[uid])}


# ✅ Protected endpoint — get saved recipes
@app.get("/my-recipes")
async def get_recipes(request: Request):
    uid = verify_token(request)
    return {"recipes": user_saved_recipes.get(uid, [])}



# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
# import os
# import requests

# # Load environment variables
# load_dotenv()

# # Initialize FastAPI app
# app = FastAPI()

# # Allow frontend requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def root():
#     return {"message": "MakeThisEdible.ai backend running!"}

# @app.post("/generate-recipe")
# async def generate_recipe(request: Request):
#     data = await request.json()
#     ingredients = data.get("ingredients", [])
#     preference = data.get("preference", "none").lower()

#     preference_map = {
#         "vegan": "Make sure the recipe is 100% vegan.",
#         "vegetarian": "Make sure the recipe is vegetarian-friendly.",
#         "microwave-only": "Only suggest recipes that can be cooked using a microwave.",
#         "none": "You can be as creative as you'd like."
#     }

#     prompt = f"""
# You are a friendly chef.
# Make a recipe using only: {', '.join(ingredients)}.
# {preference_map.get(preference, '')}
# Include:
# - Recipe name
# - Ingredients list
# - Step-by-step instructions
# """

#     response = requests.post(
#         "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent",
#         params={"key": os.getenv("GEMINI_API_KEY")},
#         json={
#             "contents": [
#                 {
#                     "role": "user",
#                     "parts": [{"text": prompt}]
#                 }
#             ]
#         }
#     )

#     if response.status_code != 200:
#         print("Gemini API error:", response.text)
#         return {"recipe": "Oops! Gemini didn't respond properly."}

#     result = response.json()
#     recipe = result["candidates"][0]["content"]["parts"][0]["text"]
#     return {"recipe": recipe}



# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
# import os
# import requests

# # Load .env file
# load_dotenv()

# app = FastAPI()

# # Add CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Root route
# @app.get("/")
# def root():
#     return {"message": "MakeThisEdible.ai backend running!"}

# # POST endpoint
# @app.post("/generate-recipe")
# async def generate_recipe(request: Request):
#     data = await request.json()
#     ingredients = data.get("ingredients", [])
#     preference = data.get("preference", "none").lower()

#     preference_map = {
#         "vegan": "Make sure the recipe is 100% vegan.",
#         "vegetarian": "Make sure the recipe is vegetarian-friendly.",
#         "microwave-only": "Only suggest recipes that can be cooked using a microwave.",
#         "none": "You can be as creative as you'd like."
#     }

#     prompt = f"""
# You are a helpful chef.
# Make a recipe using: {', '.join(ingredients)}.
# {preference_map.get(preference, '')}

# Include recipe name, ingredients, and steps.
# """

#     response = requests.post(
#     "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
#     params={"key": os.getenv("GEMINI_API_KEY")},
#     json={
#         "contents": [
#             {
#                 "parts": [{"text": prompt}],
#                 "role": "user"
#             }
#         ]
#     }
# )


#     if response.status_code != 200:
#         print("Gemini API error:", response.text)
#         return {"recipe": "Oops! Gemini didn't respond properly."}

#     result = response.json()
#     recipe = result["candidates"][0]["content"]
#     return {"recipe": recipe}
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
# import os
# import google.generativeai as genai

# load_dotenv()
# api_key = os.getenv("GEMINI_API_KEY")
# genai.configure(api_key=api_key)

# app = FastAPI()

# # Allow requests from frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def root():
#     return {"message": "MakeThisEdible.ai backend running!"}

# @app.post("/generate-recipe")
# async def generate_recipe(request: Request):
#     data = await request.json()
#     ingredients = data.get("ingredients", [])
#     preference = data.get("preference", "none").lower()

#     # Preference string logic
#     preference_map = {
#         "vegan": "Make sure the recipe is 100% vegan.",
#         "vegetarian": "Make sure the recipe is vegetarian-friendly.",
#         "microwave-only": "Only suggest recipes that can be cooked using a microwave.",
#         "none": "You can be as creative as you'd like."
#     }
#     preference_instruction = preference_map.get(preference, preference_map["none"])

#     prompt = f"""
# You are a creative and helpful chef.
# Your job is to suggest a recipe using only the following ingredients:
# {', '.join(ingredients)}.

# {preference_instruction}

# Include:
# - Recipe name
# - Ingredients list
# - Step-by-step instructions

# Make it sound friendly and easy to follow.
# """

#     model = genai.GenerativeModel(model_name="gemini-pro")
#     response = model.generate_content(prompt)

#     return {"recipe": response.text}
