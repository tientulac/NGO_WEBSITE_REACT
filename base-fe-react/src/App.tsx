import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RolePage from "./pages/role/Role.page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="role" element={<RolePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
