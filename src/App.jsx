import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import "./App.css";

import { Layout } from "../components/Layout";

// pages
import Main from "../pages/Main";
import Login, {action as LoginAction} from "../pages/Login";
import About from '../pages/About'
import Category, {loader as CategoryLoader, action as CategoryAction} from '../pages/Category'
import Trivia, {loader as TriviaLoader} from '../pages/Trivia'
import Result from '../pages/Result'

import NotFound from "../pages/NotFound";
import Error from "../pages/Error";

import { requireAuth } from "./utils";

//     <>
//       <Header uName={user.userName}/>
//       <Main formFunc={handleSubmit} initGame={startGame} uName={user.userName} triviaData={trivia} categories={categories}/>
//       <Footer />
//     </>

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Main />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} action={LoginAction}/>
      <Route path="play"
        element={<><Outlet /> </>}
        errorElement={<Error />}
        loader={async ({request}) => {
          return requireAuth(request)
        }}>
        <Route index element={<Category />} loader={CategoryLoader} action={CategoryAction}/>
        <Route path="trivia" element={<Trivia />} loader={TriviaLoader}/>
        <Route path="results" element={<Result />} />
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Route>
  ), {
    basename:import.meta.env.BASE_URL
  }
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
