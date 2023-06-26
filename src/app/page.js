import BookList from "./components/booklist";
import Link from "next/link";
import Login from "src/app/components/login";

export default function Home() {
  return (
    <div>
      <Login />
      <Link href="/profile">see your stores</Link>
      <h1>All Book Store</h1>
      <BookList />
    </div>
  );
}
