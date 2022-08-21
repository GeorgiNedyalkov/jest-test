const { expect } = require("expect");

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// Common matchers
test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

// Truthiness
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// Numbers
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeLessThan(10);
  expect(value).toBeGreaterThanOrEqual(4);
  expect(value).toBeGreaterThanOrEqual(1);
  expect(value).toBeLessThanOrEqual(4);
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// Strings
test(`there is no I in team`, () => {
  expect("team").not.toMatch(/I/);
});

test(`but there is "stop in Christoph`, () => {
  expect("Christoph").toMatch(/stop/);
});

// Arrays and iterables
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test(`the shopping list has milk on it`, () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

// Exceptions
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK");
}

test("compiling android goas as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // we can also use the exact error message
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
