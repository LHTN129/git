"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddBook({
  bookId,
  userId,
  name,
  desc,
  price,
  isbn10,
  buy,
  onAddBook,
}) {
  const supabase = createClientComponentClient();

  const handleAddBook = async () => {
    // Validate book information

    if (bookId && userId) {
      await supabase.from("sku").insert([{ user_id: userId, book_id: bookId }]);
      console.log("Book added successfully! with BookId");
      return;
    }

    if (!name || !desc || !price || !isbn10) {
      // Show a fail message indicating missing information
      console.log("Please provide all the required book information.");
      return;
    }

    // Check if the book with the given ISBN already exists in the 'books' table
    const { data: existingBooks } = await supabase
      .from("books")
      .select("id")
      .eq("isbn10", isbn10)
      .limit(1);

    if (existingBooks && existingBooks.length > 0) {
      // Book already exists, insert a new row in 'sku' table to record the ownership
      await supabase
        .from("sku")
        .insert([{ user_id: userId, book_id: existingBooks[0].id }]);
      console.log("Book added successfully!");
      onAddBook();
    } else {
      // Book doesn't exist, insert a new book in 'books' table and 'sku' table
      await supabase
        .from("books")
        .insert([{ name, desc, price, isbn10, buy }])
        .single();

      const { data: newBook, error } = await supabase
        .from("books")
        .select()
        .eq("isbn10", isbn10)
        .limit(1);

      if (error) {
        console.log("Failed to get new book id:", error.message);
        return;
      }

      await supabase
        .from("sku")
        .insert([{ user_id: userId, book_id: newBook[0].id }]);
      console.log("Sku added successfully!");
      onAddBook();
    }
  };

  return (
    <button
      className="bg-indigo-500"
      style={{ marginLeft: "10px", marginRight: "10px" }}
      onClick={handleAddBook}
    >
      Add Book
    </button>
  );
}
