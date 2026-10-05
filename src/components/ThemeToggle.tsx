"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-lg shadow-sm transition hover:border-emerald-500 dark:border-stone-800 dark:bg-stone-900"
    >
      {/* 마운트 전에는 아이콘을 비워 하이드레이션 불일치를 피한다 */}
      {dark === null ? null : dark ? "☀️" : "🌙"}
    </button>
  );
}
