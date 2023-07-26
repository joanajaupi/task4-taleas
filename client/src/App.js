import './App.css';
import React, {useState}from "react";
import Categories from './components/categories';
import JsonData from "./data/data.json";
import { Navigation } from "./components/navigation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  BrowserRouter,
} from "react-router-dom";
import { Services } from "./components/services";
import { Header } from "./components/header";
import { Signup } from "./components/signup";
const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  React.useEffect(() => {
    setLandingPageData({JsonData});
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Header data={landingPageData.Header} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/services" element={<Services data={landingPageData.Services}/>} />
      </Routes>      
    </div>
  );
};

export default App;
