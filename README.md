# 🥕 MakeThisEdible.ai

> *"Type what you’ve got. Eat what it becomes."*  
A quirky, AI-powered recipe generator that transforms whatever's lurking in your fridge into something *almost* gourmet — powered by Gemini, FastAPI, and React.

---

## 🧠 What It Does

MakeThisEdible.ai helps people (especially students and busy humans) figure out **what to cook using whatever random ingredients they already have**.

Just type in the ingredients → the app uses **Google's Gemini API** to generate a realistic, quick recipe.

---

## ⚙️ Tech Stack

- **Frontend**: React + TailwindCSS
- **Backend**: FastAPI (Python)
- **LLM**: Gemini API (Google Generative AI)
- **Deployment**: Vercel (frontend) + Render (backend)

---

## ✨ Features

- 🧠 Gemini-powered recipe generation
- ✅ Ingredient filters (e.g. vegetarian, microwave-only)
- 🧊 Handles weird combos with grace (or humor)
- 🧾 Clean UI with React + Tailwind
- 📦 Easy to deploy and extend

---

## 💡 Future Ideas

- 🥕 Image upload of fridge items
- 🔄 Save + favorite recipes
- 🗓️ Weekly meal planner
- 🛒 Smart grocery suggestions

---

## 🚀 How to Run Locally

### 1. Clone the repo:
```bash
git clone https://github.com/vidhimudaliar/make-this-edible-ai.git
cd make-this-edible-ai
```

### 2. Install frontend dependencies:
```bash
cd frontend
npm install
npm run dev
```

### 3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 4. Add your Gemini API key
Create a `.env` file in `/backend`:
```env
GEMINI_API_KEY=your-google-api-key
```

---

## 👩‍💻 Made By

**Vidhi Mudaliar**  
Inspired by the struggle of 2 a.m. hunger and a completely chaotic fridge.

---

If this made you laugh or saved you from eating plain rice again — consider giving it a ⭐ on GitHub!
