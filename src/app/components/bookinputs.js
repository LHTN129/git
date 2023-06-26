"use client";

import AddBook from "./addbook";
import { useState } from "react";

export default function BookInputs({ userId }) {
  const [BookName, setName] = useState("");
  const [BookDesc, setDesc] = useState("");
  const [BookPrice, setPrice] = useState("");
  const [BookISBN10, setIsbn] = useState("");
  const [BookBuyLink, setBuyLink] = useState("");

  const resetInputs = () => {
    setName("");
    setDesc("");
    setPrice("");
    setIsbn("");
    setBuyLink("");
  };

  return (
    <>
      <label className="ml-5">
        Name:
        <input
          className="text-gray-900 p-1.5 text-sm mx-5 gap-6 md:grid-cols-2"
          type="text"
          value={BookName}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          className="text-gray-900 p-1.5 text-sm mx-5 gap-6 md:grid-cols-2"
          type="text"
          value={BookDesc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          className="text-gray-900 p-1.5 text-sm mx-5 gap-6 md:grid-cols-2"
          type="number"
          value={BookPrice}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        ISBN-10:
        <input
          className="text-gray-900 p-1.5 text-sm mx-5 gap-6 md:grid-cols-2"
          type="text"
          value={BookISBN10}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </label>
      <label>
        Buy Link:
        <input
          className="text-gray-900 p-1.5 text-sm mx-5 gap-6 md:grid-cols-2"
          type="text"
          value={BookBuyLink}
          onChange={(e) => setBuyLink(e.target.value)}
        />
      </label>

      <AddBook
        name={BookName}
        desc={BookDesc}
        price={BookPrice}
        isbn10={BookISBN10}
        buy={BookBuyLink}
        userId={userId}
        onAddBook={resetInputs}
      />
    </>
  );
}
