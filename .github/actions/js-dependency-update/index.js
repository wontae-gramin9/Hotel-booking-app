// [Convention] Custom JS Function을 위한 파일
// 물론 split할 수도 있다.
// entry function은 run()으로 이름짓는다.

const core = require("@actions/core");
// exec: CLI 실행, CLI 아웃풋을 action에서 사용하기 위한 유틸리티 제공
// github: Github API와 interact

async function run() {
  /* 
  1. Parse inputs
    - 1. base-branch (from which to check for updates)
    - 2. Target branch (to use to create the PR)
    - 3. Github Token for auth purposes (to create PRs)
    - 4. Working directory for which to check for dependencies
  2. Execute the npm update command within the working directory
    - hotel앱의 npm update하면, hotel앱의 package-lock.json파일이 변경된다
  3. Check whether there are modified package.json files
  4. If there are modified files: 
    - Create a PR to the base-branch using octokit API(github API)
    - Otherwise, conclude the custom action
  */
  const baseBranch = core.getInput("base-branch");
  const targetBranch = core.getInput("target-branch");
  const ghToken = core.getInput("gh-token");
  const workingDir = core.getInput("working-directory");
  const debug = core.getBooleanInput("debug");
  // gh-token을 secret으로 만들어준다.
  core.setSecret(ghToken);

  core.info("I am a custom JS action");
}

run();
