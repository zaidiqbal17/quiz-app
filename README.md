# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Quiz App

A simple Quiz Application built using **React**. It fetches quiz questions from an API, shows them to the user, and tracks answers with a timer.

---

## 📖 Overview
This app is made to test users with multiple-choice questions. It has a clean design, a timer to limit the quiz, and reusable components to keep the code simple and organized.  
I built this project to practice **React hooks, API calls, reusable components, and TailwindCSS**.

---

## 🛠 My Approach
- Planned the structure (questions, options, timer, buttons).
- Built **reusable components** like Button, InputField, QuestionDisplay.
- Created a **custom hook (useQuizData)** for fetching quiz questions.
- Added a **Timer** component to control quiz duration.
- Styled everything using **TailwindCSS**.

---

## 🧩 Components I Built
- **Button** → Reusable button with different variants (primary, secondary, danger).  
- **InputField** → Input field with label and required validation.  
- **QuestionDisplay** → Shows question and multiple-choice options.  
- **Timer** → Countdown timer for quiz duration.  
- **useQuizData (Custom Hook)** → Handles quiz question fetching and API state.

---

## ⚙️ Setup & Installation
1. Clone the repository:  
   ```bash
   git clone https://github.com/zaidiqbal17/quiz-app.git

   cd quiz-app

   npm install

   npm run dev
   

## Challenges Faced & Solutions
Timer going below zero → Solved by using Math.max in the Timer component.

State update after unmount → Added an isMounted flag in useQuizData.

Dynamic button styling → Used conditional class names to highlight selected options.

