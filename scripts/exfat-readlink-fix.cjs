// exFAT 드라이브에서는 일반 파일에 readlink를 호출하면 EINVAL 대신 EISDIR이 나와
// webpack이 빌드에 실패한다. EISDIR을 "심볼릭 링크 아님"(EINVAL)으로 바꿔준다.
// next 실행 시 `node -r`로 미리 불러온다 (package.json scripts 참고).
const fs = require("fs");

function toEinval(err) {
  if (err && err.code === "EISDIR") {
    err.code = "EINVAL";
    err.errno = -4071;
  }
  return err;
}

const { readlink, readlinkSync } = fs;
fs.readlink = function (path, options, callback) {
  const cb = typeof options === "function" ? options : callback;
  const opts = typeof options === "function" ? undefined : options;
  return readlink.call(fs, path, opts, (err, link) => cb(toEinval(err), link));
};
fs.readlinkSync = function (...args) {
  try {
    return readlinkSync.apply(fs, args);
  } catch (err) {
    throw toEinval(err);
  }
};
const readlinkPromise = fs.promises.readlink;
fs.promises.readlink = (...args) =>
  readlinkPromise.apply(fs.promises, args).catch((err) => {
    throw toEinval(err);
  });
