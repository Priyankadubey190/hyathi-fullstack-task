import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./component/header.component";
import { Loader } from "./component/loader";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <Header />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
