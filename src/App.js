import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainMenu from "./routes/MainMenu";
import Game from "./routes/Game";
import Guide from "./routes/Guide";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainMenu />}></Route>
        <Route path="game" element={<Game />} />
        <Route path="guide" element={<Guide />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
