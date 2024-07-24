import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./component/header.component";
import { Loader } from "./component/loader";

const Home = lazy(() => import("./pages/Home"));
const Registration = lazy(() => import("./component/authForm"));
const AdoptedPokemon = lazy(() => import("./pages/adoptedPokemon"));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Registration />} />{" "}
          <Route path="/pokemon" element={<Home />} />{" "}
          <Route path="/adopted" element={<AdoptedPokemon />} />{" "}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
