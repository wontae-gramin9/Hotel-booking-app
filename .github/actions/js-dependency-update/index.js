// [Convention] Custom JS Function을 위한 파일
// 물론 split할 수도 있다.
// entry function은 run()으로 이름짓는다.

const core = require("@actions/core");
async function run() {
  core.info("I am a custom JS action");
}

run();
