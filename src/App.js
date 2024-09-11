import "./App.css";
import Home from "./home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formulaire from "./formulaire";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<Formulaire />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
