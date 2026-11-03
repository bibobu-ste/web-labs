import { useEffect, useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/xkjjkjdn";
const DELAY_MS = 60000;

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("feedbackClosed")) return;
    const timer = setTimeout(() => setIsOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem("feedbackClosed", "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("Надсилання...");
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("Дякуємо! Повідомлення надіслано.");
      form.reset();
      setTimeout(close, 1500);
    } catch {
      setStatus("Помилка надсилання. Спробуйте пізніше.");
    }
  };

  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-xl font-bold">Зворотний зв'язок</h2>

            <form
              action={FORMSPREE_URL}
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <label className="block">
                Ім'я
                <input className={inputClass} name="name" type="text" required />
              </label>
              <label className="block">
                Email
                <input className={inputClass} name="email" type="email" required />
              </label>
              <label className="block">
                Номер телефону
                <input className={inputClass} name="phone" type="tel" required />
              </label>
              <label className="block">
                Повідомлення
                <textarea className={inputClass} name="message" rows={4} required />
              </label>

              {status && <p role="status">{status}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Надіслати
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Закрити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactForm;
