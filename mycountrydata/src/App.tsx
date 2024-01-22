import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryForm from "./CountryForm";
import CountryInfo from "./CountryInfo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:country" element={<CountryInfo />} />
        <Route path="/" element={<CountryForm />} />
      </Routes>
    </Router>
  );
};

export default App;
