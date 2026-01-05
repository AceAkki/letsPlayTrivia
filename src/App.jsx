import { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./App.css";

import { Layout } from "../components/Layout";

// pages
import Main from "../pages/Main";
import Login from "../pages/Login";
// import About from '../pages/About'
// import Category from '../pages/Category'
// import Trivia from '../pages/Trivia'

//     <>
//       <Header uName={user.userName}/>
//       <Main formFunc={handleSubmit} initGame={startGame} uName={user.userName} triviaData={trivia} categories={categories}/>
//       <Footer />
//     </>

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
