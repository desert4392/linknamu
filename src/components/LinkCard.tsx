import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      // 오른쪽 클릭 수와 겹치지 않으면서 제목이 가운데에 오도록 좌우 여백을 똑같이 준다
      className="relative block w-full rounded-2xl border border-stone-200 bg-white px-16 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:translate-y-0 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-400"
    >
      <span className="block font-semibold">{link.title}</span>
      {link.description && (
        <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">
          {link.description}
        </span>
      )}
      <span
        aria-label={`클릭 ${count}회`}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs tabular-nums text-stone-400 dark:text-stone-500"
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
