import React from "react";
import Main from "./layouts/main/Main"; // ✅ đường dẫn đúng với file của bạn

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Main />
    </div>
  );
};

export default App;
