import React, { useEffect, useState } from "react";
import { getPaginated } from "../../services/bookServices";
import { Link } from "react-router-dom";

export const BookComponent = () => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("reading");

  useEffect(() => {
    getPaginated(page, type).then((res) => {
      setBooks(res.array);
      setTotal(res.total);
      setPage(page);
    });
  }, [page, type]);

  const bookRender = () =>
    books.map((book) => (
      <div key={book.id} className="update-children">
        <p>title: {book.title} </p>
        <p>author: {book.author}</p>
        <p>status: {book.status}</p>
        <Link to={`/books/${book.id}`}>More</Link>
      </div>
    ));

  const totalPages = Math.ceil(total / 100 + 1);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const buttonRender = () =>
    pageNumbers.map((page) => (
      <button onClick={() => setPage(page)}>{page}</button>
    ));

  return (
    <div>
      <div>add books</div>
      <div>
        Sort By:{" "}
        <select value="type" onChange={(e) => setType(e.target.value)}>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
          <option value="plan to read">Plan To Read</option>
        </select>
      </div>
      <div>{bookRender()}</div>
      {buttonRender()}
    </div>
  );
};
