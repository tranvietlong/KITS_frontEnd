import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BASE_URL } from "./config";
import App from "./App.jsx";
import Home from "./components/Home/Home.jsx";
import UnitConverter from "./components/UnitConverter/UnitConverter";
import Quotes from "./components/Quotes/Quotes.jsx";
import Calculator from "./components/Calculator/Calculator.jsx";
import Chessboard from "./components/Chessboard/Chessboard.jsx";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import ErrorPage from "./error-page";
import LoginForm from "./login";
import "./index.css";

const router = createBrowserRouter([
  {
    path: `${BASE_URL}/`,
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: `${BASE_URL}/home`,
        element: <Home />,
      },
      {
        path: `${BASE_URL}/quotes`,
        element: <Quotes />,
      },
      {
        path: `${BASE_URL}/unitConverter`,
        element: <UnitConverter />,
      },
      {
        path: `${BASE_URL}/calculator`,
        element: <Calculator />,
      },
      {
        path: `${BASE_URL}/chessboard`,
        element: <Chessboard />,
      },
      {
        path: `${BASE_URL}/pomodoro`,
        element: <Pomodoro />,
      },
    ],
  },
  {
    path: `${BASE_URL}/login`,
    element: <LoginForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
