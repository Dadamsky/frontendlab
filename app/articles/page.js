"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase"; // Import Firestore
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; // Import funkcji Firestore
import { useForm } from "react-hook-form";

export default function ArticlesPage() {
  const { user } = useAuth(); // Pobieranie zalogowanego użytkownika
  const [articles, setArticles] = useState([]); // Stan przechowujący listę artykułów
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState(""); // Stan błędów
  const [submitError, setSubmitError] = useState(""); // Stan błędu formularza

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      date: "",
    },
  });

  // Pobieranie danych z Firestore
  useEffect(() => {
    const fetchArticles = async () => {
      if (!user) return;

      try {
        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);

        // Przetwarzanie danych
        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Error fetching articles:", err.message);
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user]);

  // Obsługa dodawania nowych artykułów
  const onSubmit = async (data) => {
    try {
      if (!user) throw new Error("User not authenticated");

      const newArticle = {
        ...data,
        user: user.uid, // Przypisanie artykułu do zalogowanego użytkownika
      };

      await addDoc(collection(db, "articles"), newArticle);

      console.log("Article added successfully!");
      alert("Article added successfully!");
      reset(); // Resetowanie formularza
      setArticles((prev) => [...prev, newArticle]); // Dodanie nowego artykułu do listy lokalnej
    } catch (err) {
      console.error("Error adding article:", err.message);
      setSubmitError("Failed to add article. Please try again.");
    }
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Articles</h1>

      {/* Wyświetlanie artykułów */}
      <div className="mb-8">
        {loading ? (
          <p>Loading articles...</p>
        ) : articles.length === 0 ? (
          <p>No articles found for this user.</p>
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-700">{article.content}</p>
                <p className="text-sm text-gray-500">Date: {article.date || "N/A"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formularz dodawania nowego artykułu */}
      <h2 className="text-xl font-semibold mb-4">Add New Article</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitError && (
          <div className="alert alert-error mb-4">
            <span>{submitError}</span>
          </div>
        )}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Content is required" })}
            className="w-full px-3 py-2 border rounded"
            rows="5"
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
