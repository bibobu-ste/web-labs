import { useEffect, useState } from "react";

const VARIANT = 24;

function Reviews() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setComments(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getComments();
  }, []);

  return (
    <section className="rounded-xl bg-white/70 p-6 shadow backdrop-blur-sm dark:bg-slate-800/70">
      <h2 className="mb-4 border-b-2 border-teal-600 pb-1 text-2xl font-bold">
        Відгуки колишніх роботодавців
      </h2>

      {loading && <p>Завантаження відгуків...</p>}
      {error && <p className="text-red-500">Помилка: {error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {comments.map((c) => (
          <article
            key={c.id}
            className="rounded-lg border border-slate-200/70 border-l-4 border-l-teal-600 bg-white/40 p-3 dark:border-slate-600 dark:border-l-blue-400 dark:bg-slate-700/40"
          >
            <h3 className="font-semibold">{c.name}</h3>
            <p className="mb-2 text-xs opacity-70">{c.email}</p>
            <p className="text-sm">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
