# Learning the Jest Testing Framework

- Install JEST

`npm install --save-dev jest`

## Getting Started

Writing a test for a function that adds two numbers.

1. Create a funtion that adds two numbers

- Write function
- Export module

2. Create a test file

- Import function
- Write test for 1 + 2 = 3

3. Add scripts test: jest in package.json
4. Run command npm test
   `npm test`

## Using Matchers

Jest uses "matchers" to test values in different ways.

- Common Matchers
  The simplest way to test a value is with exact equality. Is 2 + 2 = 4.

  ```javascript
  test("two plus two is four", () => {
    expect(2 + 2).toBe(4);
  });
  ```

  `expect()` returns an "expectation" object. We use these objects to call matchers on them.
  `.toBe()` is the matcher.

  `toBe` uses Object.is to test exact equality. If you want to check the value of an object, use `toEqual` instead:

  ```javascript
  test("object assignment", () => {
    const data = { one: 1 };
    data["two"] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
  });
  ```

  `toEqual` recursively checks every field of an object or array.

  We can also use tests for an opposite of a matcher

  ```javascript
  test("adding positive numbers is not zero", () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });
  ```

- Truthiness
  In tests, sometimes we need to distinguish between `undefined`, `null`, and `false`.
  We also sometimes do not want to treat these differently.

  - `toBeNull` matches only `null`
  - `toBeUndefined` matches only `undefined`
  - `toBeDefined` is the opposite of `toBeUndefined`
  - `toBeTruthy` matches anything that an `if` statement treats as true.
  - `toBeFalsy` matches anything that an `if` statement treats as false.

  For example:

  ```javascript
  test("null", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  ```

  ```javascript
  test("zero", () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });
  ```

- Numbers

  Most ways for comparing numbers have matcher equivalents.

  ```javascript
  test("two plus two", () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });
  ```

  For floating point equality, use `toBeCloseTo` instead of `toEqual`, because we don't want
  tests to depend on a tiny rounding error.

  ```javascript
  test("adding floating point numbers", () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });
  ```

- Strings

  You can check strings against regular expressions with `toMatch`:

  ```javascript
  test("there is no I in team", () => {
    expect("team").not.toMatch(/I/);
  });
  ```

  ```javascript
  test('but there is a "stop" in Christoph', () => {
    expect("Christoph").toMatch(/stop/);
  });
  ```

- Arrays and iterables

  You can check if an array or iterable contains a particular item using `toContain`:

  ```javascript
  const shoppingList = [
    "diapers",
    "kleenex",
    "trash bags",
    "paper towels",
    "milk",
  ];
  ```

  ```javascript
  test("the shopping list has milk on it", () => {
    expect(shoppingList).toContain("milk");
    expect(new Set(shoppingList)).toContain("milk");
  });
  ```

- Exceptions

  If we want to test wheter a particular function throws an error when it's called we use `toThrow`

  ```javascript
  function compileAndroidCode() {
    throw new Error("you are using the wrong JDK");
  }
  test("compiling android goes as expected", () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  });
  ```

  **_Note_**: the function that throws an exception needs to be invoked withing a wrapping function
  otherwise the `toThrow` assertion will fail.

## Testing Asynchronous Code

- Promises

- Async / Await

- Callbacks

- .resolves / .rejects
