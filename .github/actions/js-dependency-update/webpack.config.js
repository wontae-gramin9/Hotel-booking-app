const path = require("path");

module.exports = {
  entry: "./index.js", // Action의 진입 파일
  target: "node", // Node.js 환경을 대상으로 설정
  mode: "production", // production 모드로 설정 (최적화 적용)
  output: {
    path: path.resolve(__dirname, "dist"), // 번들링 결과를 저장할 디렉토리
    filename: "index.js", // 번들 파일 이름
  },
};
