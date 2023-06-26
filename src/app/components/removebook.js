"use client";

//import { supabase } from "../../../utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RemoveBook({ skuId }) {
  const supabase = createClientComponentClient();

  const handleRemoveBook = async () => {
    // Delete the book from 'sku' table based on the user and book ID
    await supabase.from("sku").delete().eq("id", skuId);
    console.log("Remove Book Succesfully");
  };

  return (
    <button
      className="bg-indigo-500"
      style={{ marginLeft: "10px", marginRight: "10px" }}
      onClick={handleRemoveBook}
    >
      Remove Book
    </button>
  );
}
