// commitlint.config.js
module.exports = {
  extends: ['git-commit-emoji', 'cz'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        ':sparkles: feat',
        ':bug: fix',
        ':recycle: refactor',
        ':pencil2: docs',
        ':rocket: chore',
        ':lipstick: style',
        ':package: build',
        ':rewind: revert',
        ':zap: perf'
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
