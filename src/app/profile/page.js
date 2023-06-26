import BookList from "../components/booklist";

import Link from "next/link";
import BookInputs from "../components/bookinputs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Login from "../components/login";

export default async function UserStore({}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //console.log(user.id)

  return (
    <div>
      <Login />
      <div>Hello {session.user.email} </div>
      <Link href="/">homepage</Link>
      <h2>My Books</h2>
      <BookList userIdStatus={"True"} AddButton={"False"} />
      <h2>Add New Book</h2>
      <BookInputs userId={session.user.id} />
      <h2>All Book in library</h2>
      <BookList userIdStatus={"True"} AddButton={"True"} />
    </div>
  );
}
