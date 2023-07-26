import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const Navigation = (props) => {
    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                <Link to="/" className="navbar-brand page-scroll"> Meliora </Link>
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">
                    <li>
              <a href="#features">
                Features
              </a>
            </li>
            <li>
              <a href="#about">
                About
              </a>
            </li>
            <li>
              <Link to="/Services">Services</Link>
            </li>
            <li>
              <a href="#portfolio">
                Gallery
              </a>
            </li>
            
            <li>
              <a href="#team">
                Team
              </a>
            </li>
            <li>
            <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};