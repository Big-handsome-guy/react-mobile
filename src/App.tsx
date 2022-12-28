import "./App.css";
import "reset-css";
import { Routes, Route } from "react-router-dom";
import Today from "./views/today";
import Explore from "./views/explore";
import Mine from "./views/mine";
import Detail from "./views/detail";
import Test from "./views/test";
import Login from "./views/login";
import Main from "./views/main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Today />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/mine" element={<Mine />} />
        </Route>

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/zustand" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
