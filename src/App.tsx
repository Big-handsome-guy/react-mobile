import "./App.css";
import "reset-css";
import Footerbar from "./components/FooterBar";
import { Routes, Route } from "react-router-dom";
import Today from "./views/today";
import Explore from "./views/explore";
import Mine from "./views/mine";
import Detail from "./views/detail";
import Test from "./views/test";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/zustand" element={<Test />} />
      </Routes>
      <Footerbar />
    </div>
  );
}

export default App;
