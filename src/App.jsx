import { useEffect, useState } from 'react'
import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Main } from "../components/MainSec"

function App() {
  let [user, setUser] = useState({userName:"", userToken:""});
  let [trivia, setTrivia] = useState(null);
  let [categories, setCategories] = useState(null);

  async function handleSubmit(formData) {
      const inputUserName = formData.get("name");
      try {
      const response = await fetch(`https://opentdb.com/api_token.php?command=request`);
      if (response) {
        const data = await response.json();
        console.log(data)
        setUser(prev => {
          return {...prev, userName:inputUserName, userToken:data.token}
        }
        );
      }
    } catch (error) {
        console.log(error)
    }
      
  }
    
  async function startGame(formData) {
    let getCategory = formData.get("category");
    let getType = formData.get("type");
    let getDifficulty = formData.get("difficulty");
    console.log(user)
    await getData(getCategory, getDifficulty, getType, user.userToken);
  }

  async function getData(category, difficulty, type, userToken) {
    let selectedCategory = category ? `&category=${category}` : '';
    let selectedDifficulty = difficulty ? `&difficulty=${difficulty}` : '';
    let selectedType = type ? `&type=${type}` : '';
    let generatedToken = `&token=${userToken}`
    
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10${selectedCategory}${selectedDifficulty}${selectedType}${generatedToken}`);
      console.log(`https://opentdb.com/api.php?amount=10${selectedCategory}${selectedDifficulty}${selectedType}${generatedToken}`)
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
      <Header uName={user.userName}/>
      <Main formFunc={handleSubmit} initGame={startGame} uName={user.userName} triviaData={trivia} categories={categories}/>
      <Footer />
    </>
  )
}

export default App
