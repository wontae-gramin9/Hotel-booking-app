const path = require("path");

module.exports = {
  entry: "./index.ts", // Action의 진입 파일
  target: "node", // Node.js 환경을 대상으로 설정
  mode: "production", // production 모드로 설정 (최적화 적용)
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 파일을 처리
        use: "ts-loader", // ts-loader를 사용
        exclude: /node_modules/, // node_modules는 제외
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // import 시 확장자 생략 가능
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 번들링 결과를 저장할 디렉토리
    filename: "index.js", // 번들 파일 이름
  },
};
