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
import Collect from "./views/collect";
import Guard from "./guard";
import AudioPlay from "./components/audio";
import Bubble from "./components/bubble";
import { usePlayerStore } from "./store/player";

function App() {
  const { bubbleShow } = usePlayerStore((state) => state);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Today />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/mine"
            element={
              <Guard>
                <Mine />
              </Guard>
            }
          />
        </Route>

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mine/collect"
          element={
            <Guard>
              <Collect />
            </Guard>
          }
        />
        <Route path="/zustand" element={<Test />} />
      </Routes>
      <AudioPlay />
      {bubbleShow ? <Bubble /> : ""}
    </div>
  );
}

export default App;
