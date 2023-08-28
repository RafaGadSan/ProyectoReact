import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   path: "/dashboard",
      //   element: <Dashboard />,
      // },
      // {
      //   path: "/recipes",
      //   element: <Recipes/>,
      // },
      // {
      //   path: "/recipes/recipe/:id",
      //   element: <DetailedRecipe/>,
      // },
      // {
      //   path: "/ingredients",
      //   element: <Ingredients/>,
      // },
      // {
      //   path:"/ingredients/ingredient/:id",
      //   element: <DetailedIngredient/>,
      // },
      // {
      //   path: "/forgotPassword",
      //   element: <ForgotPassword />,
      // },
      // {
      //   path: "/verifyCode",
      //   element: <CheckCode />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
