"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase"; // Dostosuj ścieżkę do swojej struktury
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault(); // Zapobiega odświeżeniu strony
    try {
      await signOut(auth); // Wylogowanie użytkownika
      router.push("/"); // Przekierowanie na stronę główną
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Logout</h1>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
