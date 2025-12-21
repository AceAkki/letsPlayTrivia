import { useEffect, useState } from 'react'
import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Main } from "../components/MainSec"

function App() {
  let [userName, setUserName] = useState("");
  let [trivia, setTrivia] = useState(null);
  let [categories, setCategories] = useState(null);

  async function handleSubmit(formData) {
      const username = formData.get("name");
      setUserName(prev => username);
  }
    
  async function startGame(formData) {
    let getCategory = formData.get("category");
    let getType = formData.get("type");
    let getDifficulty = formData.get("difficulty");
    await getData(getCategory, getDifficulty, getType);
  }

  async function getData(category, difficulty, type) {
    let selectedCategory = category ? `&category=${category}` : '';
    let selectedDifficulty = difficulty ? `&difficulty=${difficulty}` : '';
    let selectedType = type ? `&type=${type}` : '';
    
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10${selectedCategory}${selectedDifficulty}${selectedType}`);
      if (response) {
        const data = response.json();
        setTrivia(await data);
      }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=> {
    let headerHeight = Math.floor(document.querySelector("header").getBoundingClientRect().height) + 50;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);
    async function fetchCategories() {
      const data = await fetch("https://opentdb.com/api_category.php");
      try {
          const response = await data.json();
          console.log(response.trivia_categories);
          setCategories(response.trivia_categories);
      } catch (error) {
          console.error(error)
      }
    }
    fetchCategories()
    
  }, [])
  
  return (
    <>
      <Header uName={userName}/>
      <Main formFunc={handleSubmit} initGame={startGame} uName={userName} triviaData={trivia} categories={categories}/>
      <Footer />
    </>
  )
}

export default App
