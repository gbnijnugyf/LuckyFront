# lucky

code about lucky

```shell
yarn install

yarn start
```

# Build

## dev image

```bash
docker build --build-arg BUILD_ENV="development" -t luckydev .
```

## product image

```bash
docker build -t lucky .
```

# 开发规约

## Branch

- 命名： user/[nickname]/[UpdateThingsDescription]

  如 user/ldz/[feat]Login

- master 分支不允许 push，master 分支只能通过 pr 修改

## Commit

- Type
  - feat：新功能（feature）
  - fix：修补 bug
  - docs：文档（documentation）
  - style： 格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
  - test：增加测试
  - chore：构建过程或辅助工具的变动
- Example
  - [fix]: fix xxx bug by using xxxxx
  - [feat]: add xxxx to xxxxx project
  - [docs]: edit xxxx project docs, add xxxx description
  - [style]: format xxx files code style
  - [refactor]: rewrite xxxx function to improve performance
  - [test]: add xxx fucntion to test xxxx
  - [chore]: update xxx pipeline/package

## PullRequest

- Title
  [项目名称]: 修改的内容简介
- Checkin

  覆盖率要求根据 repo 要求制订

  需要两个以上的人 review 代码

  需要技术总监 approve

  需要解决所有的 comment

  test 需要全部通过

- 其他

  粒度能小则小

  能写 test 尽量写

  覆盖率越高越好

  不要重复造轮子

  不需要的 pr 及时 abandon

  暂时不需要 checkin 的代码标记为 draft
