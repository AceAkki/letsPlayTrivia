import { useState } from 'react'
import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Main } from "../components/MainSec"

function App() {
  let [userName, setUserName] = useState("");

  function getUser(user) {
    setUserName(prev => user);
  }
  
  return (
    <>
      <Header />
      <Main formFunc={getUser}/>
      <Footer />
    </>
  )
}

export default App
