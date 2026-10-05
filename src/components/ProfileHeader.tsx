import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  avatar?: string;
  avatarPosition?: string;
};

export default function ProfileHeader({ name, bio, avatar, avatarPosition }: Props) {
  return (
    <section className="mt-4 flex flex-col items-center text-center">
      {avatar ? (
        <Image
          src={avatar}
          alt={`${name} 프로필 사진`}
          width={112}
          height={112}
          priority
          // next/image는 기본 설정에서 SVG 최적화를 막으므로 원본 그대로 쓴다
          unoptimized={avatar.endsWith(".svg")}
          style={avatarPosition ? { objectPosition: avatarPosition } : undefined}
          className="h-28 w-28 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-600 text-4xl font-bold text-white ring-2 ring-stone-200 dark:bg-emerald-500 dark:ring-stone-700"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-5 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{bio}</p>
    </section>
  );
}
