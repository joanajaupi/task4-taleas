import './App.css';
import React from "react";
import Categories from './components/categories';
import JsonData from "./data/data.json";
import { Navigation } from "./components/navigation";
const App = () => {
  const [landingPageData, setLandingPageData] = React.useState({});
  React.useEffect(() => {
    setLandingPageData({JsonData});
  }, []);

  return (
    <div>
      <Navigation />
    </div>
  );
};

export default App;
