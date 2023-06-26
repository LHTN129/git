import BookList from "./components/booklist";
import Link from "next/link";
import Login from "src/app/components/login";

export default function Home() {
  return (
    <div>
      <Login />
      <Link
        className="ml-5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="/profile"
      >
        see your stores
      </Link>
      <h2 className="text-4xl font-extrabold dark:text-white m-5">
        All Book Store
      </h2>
      <BookList />
    </div>
  );
}
