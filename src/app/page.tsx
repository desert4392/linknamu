import { profile } from "@/data/profile";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-4 pb-16 pt-20 sm:pt-24">
      {/* 와이어프레임 레이아웃을 건드리지 않도록 토글은 화면 모서리에 띄운다 */}
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>

      <ProfileHeader name={profile.name} bio={profile.bio} avatar={profile.avatar} />

      <ul className="mt-8 flex w-full max-w-xs flex-col gap-4">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
