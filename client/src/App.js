import './App.css';
import React, {useState}from "react";
import JsonData from "./data/data.json";
import { Navigation } from "./components/navigation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  BrowserRouter,
} from "react-router-dom";
import {OneCategory} from "./components/oneCategory";
import { Services } from "./components/services";
import { Header } from "./components/header";
import { Signup } from "./components/User/signup";
import { Login } from "./components/User/login";
import {Categories} from "./components/categories";
import {AllProducts} from "./components/Products/allProducts";
import {EditCategory} from "./components/editCategory";
const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  React.useEffect(() => {
    setLandingPageData({JsonData});
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Header/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AllProducts/>} />
        <Route path="/viewCategory/:id" element={<OneCategory/>} />
        <Route path="/editCategory/:id" element={<EditCategory/>} />
      </Routes>      
    </div>
  );
};

export default App;
