import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function test() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const name = "linh";
  const { data: skuData } = await supabase.from("sku").select();

  console.log(session);
  console.log(skuData);

  // Check if skuData is an array before using map
  const skuDataElements = skuData.map((item) => (
    <div key={item.id}>
      <p>ID: {item.id}</p>
      <p>Created At: {item.created_at}</p>
      <p>Book ID: {item.book_id}</p>
      <p>User ID: {item.user_id}</p>
    </div>
  ));

  return (
    <>
      <div>{name}</div>
      <div>{session.user.email}</div>
      <div>{session.user.id}</div>
      <div>{skuDataElements}</div>
    </>
  );
}
