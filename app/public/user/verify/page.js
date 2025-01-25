"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";

export default function VerifyEmail() {
  const { user } = useAuth(); // Pobieranie użytkownika z kontekstu
  const [registeredEmail, setRegisteredEmail] = useState(""); // Stan przechowujący adres e-mail

  useEffect(() => {
    const auth = getAuth();
    if (user) {
      setRegisteredEmail(user.email); // Zapamiętanie adresu e-mail
    }

    // Wylogowanie użytkownika po załadowaniu strony
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-700">
          A verification email has been sent to <strong>{registeredEmail}</strong>. <br />
          Please check your inbox and verify your email address to activate your account.
        </p>
      </div>
    </div>
  );
}
