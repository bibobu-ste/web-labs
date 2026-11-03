import { useEffect, useState } from "react";

function Footer() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const data = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      vendor: navigator.vendor,
      cookieEnabled: String(navigator.cookieEnabled),
      hardwareConcurrency: String(navigator.hardwareConcurrency),
      screen: `${screen.width}x${screen.height}`,
    };
    Object.entries(data).forEach(([key, value]) =>
      localStorage.setItem(key, value)
    );

    const stored = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      stored[key] = localStorage.getItem(key);
    }
    setInfo(stored);
  }, []);

  return (
    <footer className="bg-tealq-900/90 p-6 text-center text-white backdrop-blur-sm dark:bg-slate-950/90">
      <p>Лабораторна робота №4 · Львівська політехніка</p>
      <p>
        Зв'язатися зі мною:{" "}
        <a className="underline" href="mailto:hominvlad@gmail.com">
          hominvlad@gmail.com
        </a>
      </p>

      <details open className="mx-auto mt-4 max-w-3xl text-left text-xs">
        <summary className="cursor-pointer">Дані з localStorage</summary>
        <ul className="mt-2 space-y-1 break-words">
          {Object.entries(info).map(([key, value]) => (
            <li key={key}>
              <b>{key}:</b> {value}
            </li>
          ))}
        </ul>
      </details>
    </footer>
  );
}

export default Footer;
