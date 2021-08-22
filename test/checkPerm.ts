import check from "../src/check";
import * as assert from "assert";

/**
 * # IMPORTANT
 * ## TO ENABLE SKIPPED TESTS, REMOVE the ".skip"
 */
describe("Check for Permission", () => {
  describe("single string 'test' permission", () => {
    it("allow single string permission with single true object", () => {
      const res = check("test", {test: true});
      assert.strictEqual(res, true);
    });
    it.skip("allow single string permission with deep true object", () => {
      const res = check("test", {test: {test: true}});
      assert.strictEqual(res, true);
    });
    it("disallow single string permission with single false object", () => {
      const res = check("test", {test: false});
      assert.strictEqual(res, false);
    });
    it.skip("disallow single string permission with deep false object", () => {
      const res = check("test", {test: {test: false}});
      assert.strictEqual(res, false);
    });
    it("allow single string permission with single true wildcard object", () => {
      const res = check("test", {test: {"*": true}});
      assert.strictEqual(res, true);
    });
    it("allow single string permission with single false wildcard object", () => {
      const res = check("test", {test: {"*": false}});
      assert.strictEqual(res, false);
    });
    describe.skip("if key does not exist", () => {
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: {"*": false}});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: true});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: false});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: {test: true}});
        assert.strictEqual(res, false);
      });

    });

  });
  describe("double string 'test.test' permission", () => {
    it.skip("allow for double permission", () => {
      const res = check("test.test", {test: true});
      assert.strictEqual(res, true);
    });
    it.skip("disallow for double permission", () => {
      const res = check("test.test", {test: false});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission", () => {
      const res = check("test.test", {test: {test: false}});
      assert.strictEqual(res, false);
    });
    it.skip("disallow for double permission with non existing key", () => {
      const res = check("test.test", {test: {xxx: true}});
      assert.strictEqual(res, false);
    });
    it.skip("disallow for double permission with non existing key", () => {
      const res = check("test.test", {test: {xxx: false}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with wildcard", () => {
      const res = check("test.test", {test: {"*": true}});
      assert.strictEqual(res, true);
    });
    it("disallow for double permission with wildcard", () => {
      const res = check("test.test", {test: {"*": false}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard", () => {
      const res = check("test.test", {test: {test: {"*": false}}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with with deep obj and wildcard", () => {
      const res = check("test.test", {test: {test: {"*": true}}});
      assert.strictEqual(res, true);
    });
  });
  describe("double string 'test.test.*' permission", () => {
    it.skip("allow for double permission", () => {
      const res = check("test.test.*", {test: true});
      assert.strictEqual(res, true);
    });
    it.skip("disallow for double permission", () => {
      const res = check("test.test.*", {test: false});
      assert.strictEqual(res, false);
    });
    it.skip("allow for double permission", () => {
      const res = check("test.test.*", {test: {test: true}});
      assert.strictEqual(res, true);
    });
    it.skip("disallow for double permission", () => {
      const res = check("test.test.*", {test: {test: false}});
      assert.strictEqual(res, false);
    });
    it.skip("disallow for double permission with non existing key", () => {
      const res = check("test.test.*", {test: {xxx: true}});
      assert.strictEqual(res, false);
    });
    it.skip("disallow for double permission with non existing key", () => {
      const res = check("test.test.*", {test: {xxx: false}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with wildcard", () => {
      const res = check("test.test.*", {test: {"*": true}});
      assert.strictEqual(res, true);
    });
    it("disallow for double permission with wildcard", () => {
      const res = check("test.test.*", {test: {"*": false}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard", () => {
      const res = check("test.test.*", {test: {test: {"*": false}}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with with deep obj and wildcard", () => {
      const res = check("test.test.*", {test: {test: {"*": true}}});
      assert.strictEqual(res, true);
    });
    it.skip("allow for double permission with with deep obj and wildcard", () => {
      const res = check("test.test.*", {test: {test: {test2: true}}});
      assert.strictEqual(res, true);
    });
    it.skip("disallow for double permission with deep obj and wildcard", () => {
      const res = check("test.test.*", {test: {test: {test2: false}}});
      assert.strictEqual(res, false);
    });
  });
});
