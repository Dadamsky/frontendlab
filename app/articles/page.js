"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase"; // Import Firestore
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; // Import funkcji Firestore
import { useForm } from "react-hook-form";

export default function ArticlesForm() {
  const { user } = useAuth(); // Pobieranie zalogowanego użytkownika
  const [loading, setLoading] = useState(true); // Stan ładowania danych
  const [error, setError] = useState(""); // Obsługa błędów

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      date: "",
      user: user?.uid || "",
    },
  });

  // Pobieranie danych z kolekcji `articles` dla zalogowanego użytkownika
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (!user) return;

        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("user", "==", user.uid)); // Zapytanie dla zalogowanego użytkownika
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const firstArticle = querySnapshot.docs[0].data(); // Pobranie pierwszego artykułu
          setValue("title", firstArticle.title || "");
          setValue("content", firstArticle.content || "");
          setValue("date", firstArticle.date || "");
          setValue("user", firstArticle.user || user.uid); // Domyślnie aktualny użytkownik
        } else {
          console.log("No articles found for the user.");
        }
      } catch (err) {
        console.error("Error fetching articles:", err.message);
        setError("Failed to fetch articles data.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Zapisanie danych w Firestore w nowym dokumencie w kolekcji `articles`
      await setDoc(doc(collection(db, "articles")), {
        ...data,
        user: user?.uid,
      });

      console.log("Article saved successfully!");
      alert("Article saved successfully!");
    } catch (err) {
      console.error("Error saving article:", err.message);
      setError("Failed to save article. Please try again.");
    }
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Article</h1>
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="w-full px-3 py-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              {...register("content")}
              className="w-full px-3 py-2 border rounded"
              rows="5"
              disabled={loading}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className="w-full px-3 py-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
              User (Read-Only)
            </label>
            <input
              id="user"
              type="text"
              {...register("user")}
              className="w-full px-3 py-2 border rounded bg-gray-100"
              readOnly
              disabled
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
