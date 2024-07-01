import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./assets/scss/global.scss";

import { HomePage } from "./pages/Home/Home";
import { Pay } from "./pages/Pay";
import { Success } from "./pages/Success";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
