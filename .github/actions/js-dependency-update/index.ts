// [Convention] Custom JS Function을 위한 파일
// 물론 split할 수도 있다.
// entry function은 run()으로 이름짓는다.

import * as core from "@actions/core";
// exec: CLI 실행, CLI 아웃풋을 action에서 사용하기 위한 유틸리티 제공
import * as exec from "@actions/exec";
// github: Github API와 interact
import * as github from "@actions/github";

// args를 object로 하는 이유 extension이 쉽기 때문에(그냥 다른 key로 넣어주면 된다)
const validateBranchName = ({ branchName }: { branchName: string }) =>
  /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName);

const validateDirectoryName = ({ dirName }: { dirName: string }) =>
  /^[a-zA-Z0-9_\-\.\/]+$/.test(dirName);

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
  const baseBranch = core.getInput("base-branch") || "default-value";
  const targetBranch = core.getInput("target-branch", { required: true });
  const ghToken = core.getInput("gh-token");
  const workingDir = core.getInput("working-directory");
  const debug: boolean = core.getBooleanInput("debug");
  // gh-token을 secret으로 만들어준다.

  const commonExecOpts = {
    cwd: workingDir,
  };

  core.setSecret(ghToken);

  if (!validateBranchName({ branchName: baseBranch })) {
    // error를 발생함과 동시에에 action의 state를 failed로 만든다
    core.setFailed(
      "Invalid branch name. Branch names should include only characters, numbers, hyphens, underscores, dots and forwawrd slashes."
    );
    return;
  }

  if (!validateBranchName({ branchName: targetBranch })) {
    core.setFailed(
      "Invalid target name. Branch names should include only characters, numbers, hyphens, underscores, dots and forwawrd slashes."
    );
    return;
  }

  if (!validateDirectoryName({ dirName: workingDir })) {
    core.setFailed(
      "Invalid working directory name. Directory names should include only characters, numbers, hyphens, underscores and forwawrd slashes."
    );
    return;
  }

  core.info(`[js-dependency-update]: base branch is ${baseBranch}`);
  core.info(`[js-dependency-update]: target branch is ${targetBranch}`);
  core.info(`[js-dependency-update]: working directory is ${workingDir}`);

  await exec.exec("npm update", [], {
    ...commonExecOpts,
  });

  const gitStatus = await exec.getExecOutput(
    "git status -s package*.json",
    [],
    {
      ...commonExecOpts,
    }
  );
  if (gitStatus.stdout.length > 0) {
    core.info("[js-dependency-update]: There are updates available!");

    // [4-1] Add and commit files to the target-branch
    // Set up git credentials
    await exec.exec(`git config --global user.name "gh-automation"`);
    await exec.exec(`git config --global user.email "gh-automation@gmail.com"`);
    // checkout to targetBranch
    await exec.exec(`git checkout -b ${targetBranch}"`, [], {
      ...commonExecOpts,
    });
    await exec.exec(`git add package.json package-lock.json`, [], {
      ...commonExecOpts,
    });
    await exec.exec(`git commit -m "chore: update dependencies"`, [], {
      ...commonExecOpts,
    });
    await exec.exec(`git push -u origin ${targetBranch} --force`, [], {
      ...commonExecOpts,
    });
    const oktokit = github.getOctokit(ghToken);
    // create a pull request
    try {
      await oktokit.rest.pulls.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: "Update NPM dependencies",
        body: "This pull request updates NPM packages",
        base: baseBranch,
        head: targetBranch,
      });
    } catch (e) {
      core.error(
        "[js-dependency-update]: Something went wrong while creating the PR. Check logs below."
      );
      core.setFailed(e);
      core.error(e);
    }
  } else {
    core.info("[js-dependency-update]: No updates at this point in time.");
  }
}

run();
