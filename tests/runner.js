"use strict";

let passed = 0;
let failed = 0;
let currentSuite = "";

function describe(name, fn) {
  currentSuite = name;
  console.log(`\n${name}`);
  fn();
}

function it(name, fn) {
  try {
    fn();
    passed++;
    process.stdout.write(`  \x1b[32m✓\x1b[0m ${name}\n`);
  } catch (e) {
    failed++;
    process.stdout.write(`  \x1b[31m✗\x1b[0m ${name}\n`);
    process.stdout.write(`    \x1b[31m${e.message}\x1b[0m\n`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || "Assertion failed");
}

function assertEqual(a, b, message) {
  if (a !== b)
    throw new Error(
      message || `Expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`
    );
}

function assertNotEqual(a, b, message) {
  if (a === b)
    throw new Error(message || `Expected values to differ, both are ${JSON.stringify(a)}`);
}

function assertDeepEqual(a, b, message) {
  const as = JSON.stringify(a);
  const bs = JSON.stringify(b);
  if (as !== bs)
    throw new Error(message || `Expected ${bs}, got ${as}`);
}

function assertThrows(fn, expectedMsg) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
    if (expectedMsg && !e.message.includes(expectedMsg)) {
      throw new Error(
        `Expected error to include "${expectedMsg}", got "${e.message}"`
      );
    }
  }
  if (!threw) throw new Error("Expected function to throw but it did not");
}

function assertNotThrows(fn) {
  try {
    fn();
  } catch (e) {
    throw new Error(`Expected no throw but got: ${e.message}`);
  }
}

function assertContains(str, sub, message) {
  if (!str.includes(sub))
    throw new Error(message || `Expected "${str}" to contain "${sub}"`);
}

function summary() {
  const total = passed + failed;
  console.log(`\n${"─".repeat(50)}`);
  console.log(
    `Total: ${total}  |  \x1b[32mPassed: ${passed}\x1b[0m  |  \x1b[31mFailed: ${failed}\x1b[0m`
  );
  if (failed > 0) process.exit(1);
}

module.exports = {
  describe,
  it,
  assert,
  assertEqual,
  assertNotEqual,
  assertDeepEqual,
  assertThrows,
  assertNotThrows,
  assertContains,
  summary,
};
