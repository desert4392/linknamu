import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인)");
}

// 개발 모드에서는 핫 리로드마다 모듈이 다시 평가되므로
// 전역에 연결을 보관해 커넥션이 계속 늘어나는 것을 막는다
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClientPromise = clientPromise;
}

export async function getClicksCollection() {
  const client = await clientPromise;
  // 문서 형태: { _id: 링크 id, count: 클릭 수 }
  return client.db("linknamu").collection<{ _id: string; count: number }>("clicks");
}
