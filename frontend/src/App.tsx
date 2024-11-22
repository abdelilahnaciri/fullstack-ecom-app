import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
