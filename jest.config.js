module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["./src/test.ts"],
  collectCoverage: true,
  coverageReporters: ["text", "html"],
  coverageDirectory: "coverage",
};
