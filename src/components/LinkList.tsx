"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 보여 준다
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Record<string, number> }) => {
        // 응답 전에 눌린 클릭은 이미 화면에 더해졌으므로 서버 값과 합친다
        if (!cancelled) {
          setCounts((prev) => {
            const next = { ...data.counts };
            for (const [id, n] of Object.entries(prev)) next[id] = (next[id] ?? 0) + n;
            return next;
          });
        }
      })
      .catch((error) => console.error("클릭 수를 불러오지 못했습니다", error));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (id: string) => {
    // 서버 응답을 기다리지 않고 바로 화면에 반영한다
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // 링크가 새 탭으로 열려도 요청이 끊기지 않도록 keepalive를 켠다
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch((error) => console.error("클릭 수를 저장하지 못했습니다", error));
  };

  return (
    <ul className="mt-8 flex w-full max-w-xs flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
