import { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Reviews from "./components/Reviews";
import Skills from "./components/Skills";
import Languages from "./components/Languages";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const hours = new Date().getHours();
    setTheme(hours >= 7 && hours < 21 ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="min-h-screen bg-[url('nihqbfwfkog91.jpg')] bg-cover bg-center bg-fixed text-left text-slate-800 dark:text-slate-100">
      <Header />

      <button
        type="button"
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-40 rounded-lg bg-slate-900/80 px-4 py-2 text-sm text-white shadow hover:bg-slate-900"
      >
        {theme === "light" ? "🌙 Нічна тема" : "☀️ Денна тема"}
      </button>

      <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
        <About />
        <Education />
        <Projects />
        <Reviews />
        <Skills />
        <Languages />
      </main>

      <Footer />
      <ContactForm />
    </div>
  );
}

export default App;
