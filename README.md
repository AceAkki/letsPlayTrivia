# 🧠 letsPlayTrivia

A dynamic, category-driven trivia application built with **React** and **React Router 6**. This app leverages the Open Trivia Database API to provide a personalized quiz experience with real-time scoring and progress tracking.

---

## 🚀 Features

* **Customizable Quizzes:** Filter by Category (Science, History, Art, etc.), Difficulty (Easy, Medium, Hard), and Question Type (Multiple Choice or True/False).
* **Modern Data Fetching:** Uses React Router **Loaders** and **Actions** for efficient data management and seamless navigation.
* **Asynchronous UI:** Implements `Suspense` and `Await` to handle API loading states gracefully.
* **Session Persistence:** Saves user tokens and trivia preferences in `sessionStorage` to maintain progress.
* **Dynamic Scoring:** Tracks wins and losses in real-time and provides a personalized summary based on performance.
* **Infinite Play:** Options to restart the game or load "More Questions" (up to 50) without losing your current progress.

---
## 🛠️ Tech Stack

* **Frontend Library:** React 18/19 (Functional Components & Hooks)
* **Data Routing:** React Router 6.4+ (Utilizing `createBrowserRouter`, `loaders`, and `actions`)
* **State Management:** React Context API & `useOutletContext` for localized global state.
* **Asynchronous Patterns:** `Suspense` and `Await` for non-blocking UI rendering.
* **Persistence Layer:** Browser `sessionStorage` for secure, tab-specific session tracking.
* **Styling:** CSS3 with Dynamic Variables.