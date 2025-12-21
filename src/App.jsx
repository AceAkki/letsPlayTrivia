import { useEffect, useState } from 'react'
import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Main } from "../components/MainSec"

function App() {
  let [userName, setUserName] = useState("");
  let [trivia, setTrivia] = useState(null);

  async function handleSubmit(formData) {
      const username = formData.get("name");
      setUserName(prev => username);
      await getData();
  }

  async function getData() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean");
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
    root.setProperty("--header-height", `${headerHeight}px`)
  }, [])
  
  return (
    <>
      <Header uName={userName}/>
      <Main formFunc={handleSubmit} uName={userName} triviaData={trivia}/>
      <Footer />
    </>
  )
}

export default App
