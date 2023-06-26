"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/api/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      <label>Username</label>
      <input
        className="text-black ml-5 mr-10"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password</label>
      <input
        className="text-black text-black ml-5 mr-10"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="m-5 bg-indigo-500" onClick={handleSignUp}>
        Sign up
      </button>
      <button className="m-5 bg-indigo-500" onClick={handleSignIn}>
        Sign in
      </button>
      <button className="m-5 bg-indigo-500" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
