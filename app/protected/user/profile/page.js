"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "@/app/lib/firebase"; // Import Firestore
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import funkcji Firestore
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const { user } = useAuth(); // Pobieranie zalogowanego użytkownika
  const [loading, setLoading] = useState(true); // Stan ładowania danych
  const [error, setError] = useState(""); // Obsługa błędów

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL || "", // Domyślny adres zdjęcia
      street: "",
      city: "",
      zipCode: "",
    },
  });

  // Pobieranie adresu użytkownika z Firestore
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user?.uid));
        if (snapshot.exists()) {
          const data = snapshot.data();
          const address = data.address || {};
          setValue("street", address.street || "");
          setValue("city", address.city || "");
          setValue("zipCode", address.zipCode || "");
        } else {
          console.log("No address data found for user.");
        }
      } catch (err) {
        console.error("Error fetching address:", err.message);
        setError("Failed to fetch address data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchAddress();
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Aktualizacja profilu użytkownika w Firebase Authentication
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      // Zapisanie danych adresowych w Firestore
      await setDoc(doc(db, "users", user?.uid), {
        address: {
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
        },
      });

      console.log("Profile and address updated successfully!");
      alert("Profile and address updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err.message);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  // Pobranie wartości photoURL z formularza
  const photoURL = watch("photoURL");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
        {photoURL && (
          <div className="mb-4 text-center">
            <img
              src={photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
          </div>
        )}
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              {...register("displayName")}
              className="w-full px-3 py-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email (Read-Only)
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              id="photoURL"
              type="text"
              {...register("photoURL")}
              className="w-full px-3 py-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              id="street"
              type="text"
              {...register("street")}
              className="w-full px-3 py-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              type="text"
              {...register("city")}
              className="w-full px-3 py-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              id="zipCode"
              type="text"
              {...register("zipCode")}
              className="w-full px-3 py-2 border rounded"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
