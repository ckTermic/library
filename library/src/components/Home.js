import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Search } from "./Search.js";
import { getFour } from "../services/bookServices";

export const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getFour().then((res) => setBooks(res));
  }, []);

  const bookRender = () =>
    books.map((book) => (
      <div key={book.id} className="update-children">
        <p>title: {book.title} </p>
        <p>author: {book.author}</p>
        <p>status: {book.status}</p>
      </div>
    ));

  return (
    <div>
      <div>
        <Search />
      </div>
      <div className="home-container">
        <div className="stat-container">
          <h2> Statistics </h2>
          <div className="stats">
            <p>Total Books: </p>
            <p>Pages Read: </p>
            <p>Average Rating: </p>
            <p>Favorite Book: </p>
            <p>Favorite Genre: </p>
          </div>
        </div>
        <div className="update-container">
          <h2> Last Four Updates</h2>
          {bookRender()}
        </div>
      </div>
    </div>
  );
};
