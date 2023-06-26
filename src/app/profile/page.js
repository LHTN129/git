import BookList from "../components/booklist";
import { redirect } from "next/navigation";
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

  if (!session) {
    redirect("/unauthenticated");
  }

  return (
    <div>
      <Login />
      <div className="text-4xl font-extrabold dark:text-white m-5">
        Hello {session.user.email}{" "}
      </div>
      <Link
        className="ml-5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="/"
      >
        homepage
      </Link>
      <h2 className="text-4xl font-extrabold dark:text-white m-5">My Books</h2>
      <BookList userIdStatus={"True"} AddButton={"False"} />
      <h2 className="text-4xl font-extrabold dark:text-white m-5">
        Add New Book
      </h2>
      <BookInputs userId={session.user.id} />
      <h2 className="text-4xl font-extrabold dark:text-white m-5">
        All Book in library
      </h2>
      <BookList userIdStatus={"True"} AddButton={"True"} />
    </div>
  );
}
