import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "src/database/supabase";
import Link from "next/link";

export default function BookDetails() {
  const router = useRouter();
  console.log(router);
  const bookId = router.query.id;
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("name, desc, buy, isbn10, price")
          .eq("id", bookId)
          .single();

        if (error) {
          throw error;
        }

        setBook(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  const { name, desc, buy, isbn10, price } = book;

  return (
    <div>
      <h1>Book Details</h1>
      <Link href="/">homepage</Link>
      <h2>Name: {name}</h2>
      <p>Description: {book.desc}</p>
      <p>
        Buy link: <a href="{book.buy}">{book.buy} </a>
      </p>
      <p>ISBN-10: {book.isbn10}</p>
      <p>Price: {book.price}</p>
    </div>
  );
}
