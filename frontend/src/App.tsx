import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import Products from "./pages/Products";
import RootLayout from "./pages/Layout";
import Product from "./components/Product";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
