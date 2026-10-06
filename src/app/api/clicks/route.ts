import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 요청마다 최신 값을 읽어야 하므로 정적 캐싱을 끈다
export const dynamic = "force-dynamic";

const linkIds = profile.links.map((link) => link.id);

// 모든 링크의 클릭 수를 한 번에 돌려준다: { counts: { github: 42, ... } }
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: linkIds } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다" }, { status: 500 });
  }
}

// 링크 하나의 클릭 수를 1 올린다. body: { id: "github" }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;

  // 프로필에 없는 id로 임의 문서가 만들어지지 않도록 막는다
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다" }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 저장 실패", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다" }, { status: 500 });
  }
}
