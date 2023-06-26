"use client";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import RemoveBook from "./removebook";
import AddBook from "./addbook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShowBook({ books, AddButton, userIdStatus, userId }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime booklist")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sku",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  if (userIdStatus && AddButton === "False") {
    return (
      <ul>
        {books.map((book) => (
          <li key={book.sku_id}>
            <RemoveBook skuId={book.sku_id} />
            <Link href={{ pathname: "/bookdetails", query: { id: book.id } }}>
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  } else if (userIdStatus && AddButton === "True") {
    return (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <AddBook bookId={book.id} userId={userId} />
            <Link href={{ pathname: "/bookdetails", query: { id: book.id } }}>
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={{ pathname: "/bookdetails", query: { id: book.id } }}>
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
