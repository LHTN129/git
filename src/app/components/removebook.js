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
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      style={{ marginLeft: "10px", marginRight: "10px" }}
      onClick={handleRemoveBook}
    >
      Remove Book
    </button>
  );
}
