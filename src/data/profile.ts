export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로. 비워두면 이름 첫 글자로 대체 */
  avatar?: string;
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값. 실제 사진·주소·설명으로 교체
export const profile: Profile = {
  name: "이원진",
  bio: "세계 최강 바이브코드",
  avatar: "/avatar-placeholder.svg",
  links: [
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com/",
      description: "코드 저장소",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      url: "https://www.linkedin.com/",
      description: "경력과 이력",
    },
    {
      id: "blog",
      title: "Blog",
      url: "https://example.com/",
      description: "개발 기록",
    },
  ],
};
