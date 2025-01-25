"use client";

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const auth = getAuth();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Walidacja haseł
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match!");
      return;
    }
  
    try {
      // Rejestracja użytkownika
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
  
      // Wysłanie e-maila weryfikacyjnego
      await sendEmailVerification(auth.currentUser);
      console.log("Email verification sent!");
      alert(`Verification email sent to ${email}. Please check your inbox.`);
  
      // Wylogowanie po rejestracji
      await signOut(auth);
  
      // Przekierowanie na stronę weryfikacji
      router.push("/public/user/verify");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setRegisterError("This email is already registered. Please log in or use a different email.");
      } else if (error.code === "auth/invalid-email") {
        setRegisterError("The email address is invalid. Please enter a valid email.");
      } else if (error.code === "auth/weak-password") {
        setRegisterError("The password is too weak. Please enter a stronger password.");
      } else {
        setRegisterError(error.message);
      }
      console.error("Registration error:", error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {registerError && (
          <div className="alert alert-error mb-4">
            <span>{registerError}</span>
          </div>
        )}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
