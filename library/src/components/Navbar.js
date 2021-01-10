import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className="nav-container">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li className="nav-right">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
