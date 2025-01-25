"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/public/user/signin?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Pasek u góry strony */}
      <header className="bg-gray-100 shadow-md p-4 flex justify-between items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-700">Logged in as: {user.email}</span>
            
          </>
        ) : (
          <span className="text-sm text-gray-700">Not logged in</span>
        )}
      </header>

      {/* Główna zawartość */}
      <main>{children}</main>
    </>
  );
}
