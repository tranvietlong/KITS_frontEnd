import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import UnitConverter from "./components/UnitConverter/UnitConverter"
import Quotes from './components/Quotes/Quotes.jsx'
import Calculator from "./components/Calculator/Calculator.jsx"
import Chessboard from "./components/Chessboard/Chessboard.jsx"
import Pomodoro from "./components/Pomodoro/Pomodoro"
import ErrorPage from "./error-page";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/quotes",
        element: <Quotes />
      },
      {
        path: "unitConverter",
        element: <UnitConverter />,
      },
      {
        path: "calculator",
        element: <Calculator />,     },
      {
        path: "chessboard",
        element: <Chessboard />,
      },
      {
        path: "pomodoro",
        element: <Pomodoro />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
