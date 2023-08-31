import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { CheckCode } from "./pages/CheckCode/CheckCode.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Profile } from "./pages/Profile/Profile.jsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword.jsx";
import { Ingredients } from "./pages/Ingredients/Ingredients.jsx";
import { Protected } from "./components/Protected/Protected.jsx";
import { ProtectedCheckChildren } from "./components/ProtectedCheckChildren/ProtectedCheckChildren.jsx";
import { Recipes } from "./pages/Recipes/Recipes.jsx";
import { Ingredient } from "./components/Ingredient/Ingredient.jsx";
import { Recipe } from "./components/Recipe/Recipe.jsx";

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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile /> {/*children protegido */}
          </Protected>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard /> {/*children protegido */}
          </Protected>
        ),
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipes/recipe/:id",
        element: <Recipe />,
      },
      {
        path: "/ingredients",
        element: <Ingredients />,
      },
      {
        path: "/ingredients/ingredient/:id",
        element: <Ingredient />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/verifyCode",
        element: (
          <ProtectedCheckChildren>
            <CheckCode /> {/*children protegido */}
          </ProtectedCheckChildren>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
