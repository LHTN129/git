import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "src/app/components/login";
import Link from "next/link";

export default async function unauthenticated() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/profile");
  }

  return (
    <>
      <div class="ml-auto mr-auto mt-20 max-w-5xl p p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Login />
        <h5 className="m-5 text-3xl font-bold text-gray-900 dark:text-white">
          please sign in
        </h5>
        <Link
          className="ml-5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="/"
        >
          Back to homepage
        </Link>
      </div>
    </>
  );
}
