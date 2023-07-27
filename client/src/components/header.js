import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

export const Header = (props) => {
  
  const navigate = useNavigate();
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Meliora"}
                </h1>
                <p>Discover more</p>
                <button type="button" class="btn btn-primary" onClick = {()=> navigate('/products/')}>Discover</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};