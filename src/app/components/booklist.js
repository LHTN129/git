import { supabase } from "../../database/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ShowBook from "./showbook";

export default async function BookList({ AddButton, userIdStatus }) {
  let books = [];
  if (userIdStatus) {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session.user.id;

    if (AddButton === "False") {
      // Fetch books related to the provided userId
      const { data, error } = await supabase
        .from("sku_data")
        .select("name, id, sku_id")
        .eq("user_id", userId)
        .order("id");

      if (error) {
        console.error("Error fetching books:", error);
      } else {
        books = data;
        console.log("List of user book ", books);
      }
    } else {
      let { data: BookInUserStore, error: BookInUserStoreError } =
        await supabase.from("sku").select("book_id").eq("user_id", userId);

      if (BookInUserStoreError) {
        throw BookInUserStoreError;
      }

      const bookIds = BookInUserStore.map((book) => book.book_id); //unpack BookInUserStore into an array of IDs
      const { data, error } = await supabase
        .from("books")
        .select("name, id")
        .not("id", "in", `(${bookIds.join(",")})`) // syntax to unpack array in to individual ID number with , in between
        .order("id");

      if (error) {
        console.error("Error fetching books:", error);
      } else {
        books = data;
        console.log("List of user book ", books);
      }
    }
    return (
      <ShowBook
        books={books}
        AddButton={AddButton}
        userIdStatus={userIdStatus}
        userId={session.user.id}
      />
    );
  } else {
    // Fetch all unique books in ascending order based on book name
    const { data, error } = await supabase
      .from("books")
      .select("name, id")
      .order("id");

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      books = data;
      console.log("List of all book ", books);
    }
    return (
      <ShowBook
        books={books}
        AddButton={AddButton}
        userIdStatus={userIdStatus}
      />
    );
  }
}
