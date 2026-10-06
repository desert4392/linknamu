import { profile } from "@/data/profile";
import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-4 pb-16 pt-20 sm:pt-24">
      {/* 와이어프레임 레이아웃을 건드리지 않도록 토글은 화면 모서리에 띄운다 */}
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>

      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
        avatarPosition={profile.avatarPosition}
      />

      <LinkList links={profile.links} />
    </main>
  );
}
