import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:translate-y-0 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-400"
    >
      <span className="block font-semibold">{link.title}</span>
      {link.description && (
        <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">
          {link.description}
        </span>
      )}
    </a>
  );
}
