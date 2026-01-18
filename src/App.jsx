import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import "./App.css";

// layout
import { Layout } from "./components/Layout";
import PlayLayout from "./features/play/components/PlayLayout";

// features
import Main from "./features/Main";
import About from './features/About'

import Login, {action as LoginAction} from "./features/user/Login";
import Category, {loader as CategoryLoader, action as CategoryAction} from './features/play/Category'
import Trivia, {loader as TriviaLoader} from './features/play/Trivia'

// error handling
import NotFound from "./features/NotFound";
import Error from "./features/Error";

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
        element={ <PlayLayout />}
        errorElement={<Error />}
        loader={async ({request}) => {
          return requireAuth(request)
        }}>
        <Route index element={<Category />} loader={CategoryLoader} action={CategoryAction}/>
        <Route path="trivia" element={<Trivia />} loader={TriviaLoader}/>
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
