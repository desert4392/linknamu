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
  /** 원형 영역에 보일 사진 위치(CSS object-position). 기본값 가운데 */
  avatarPosition?: string;
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값. 실제 사진·주소·설명으로 교체
export const profile: Profile = {
  name: "이개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  avatar: "/profile.jpg",
  // 세로 사진이라 가운데를 자르면 발이 잘리므로 아래쪽에 맞춰 전신이 들어오게 한다
  avatarPosition: "center bottom",
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
