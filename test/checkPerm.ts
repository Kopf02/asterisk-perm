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
    it("deny single string permission with deep true object", () => {
      const res = check("test", {test: {test: {_: true}}});
      assert.strictEqual(res, false);
    });
    it("disallow single string permission with single false object", () => {
      const res = check("test", {test: false});
      assert.strictEqual(res, false);
    });
    it("disallow single string permission with deep false object", () => {
      const res = check("test", {test: {test: {_: false}}});
      assert.strictEqual(res, false);
    });
    it("allow single string permission with single true wildcard object", () => {
      const res = check("test", {test: {"*": {_: true}}});
      assert.strictEqual(res, true);
    });
    it("allow single string permission with single false wildcard object", () => {
      const res = check("test", {test: {"*": {_: false}}});
      assert.strictEqual(res, false);
    });
    describe("if key does not exist", () => {
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: {"*": {_: false}}});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: {_: true}});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: {_: false}});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {});
        assert.strictEqual(res, false);
      });
      it("disallow single string permission if key does not exist", () => {
        const res = check("test", {xxx: {test: {_: true}}});
        assert.strictEqual(res, false);
      });

    });

  });
  describe("double string 'test.test' permission", () => {
    it("allow for double permission", () => {
      const res = check("test.test", {test: {_: true}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission", () => {
      const res = check("test.test", {test: {_: false}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission", () => {
      const res = check("test.test", {test: {test: {_: false}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with non existing key", () => {
      const res = check("test.test", {test: {xxx: {_: true}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with non existing key", () => {
      const res = check("test.test", {test: {xxx: {_: false}}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with wildcard", () => {
      const res = check("test.test", {test: {"*": {_: true}}});
      assert.strictEqual(res, true);
    });
    it("disallow for double permission with wildcard", () => {
      const res = check("test.test", {test: {"*": {_: false}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard", () => {
      const res = check("test.test", {test: {test: {"*": {_: false}}}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with with deep obj and wildcard", () => {
      const res = check("test.test", {test: {test: {"*": {_: true}}}});
      assert.strictEqual(res, true);
    });
  });
  describe("double string 'test.test.*' permission", () => {
    it("Deny for none existing *", () => {
      const res = check("test.test.*", {test: {_: true}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission", () => {
      const res = check("test.test.*", {test: {_: false}});
      assert.strictEqual(res, false);
    });
    it("Deny for double none existing *", () => {
      const res = check("test.test.*", {test: {test: {_: true}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission", () => {
      const res = check("test.test.*", {test: {test: {_: false}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with non existing key", () => {
      const res = check("test.test.*", {test: {xxx: {_: true}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with non existing key", () => {
      const res = check("test.test.*", {test: {xxx: {_: false}}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with wildcard", () => {
      const res = check("test.test.*", {test: {"*": {_: true}}});
      assert.strictEqual(res, true);
    });
    it("disallow for double permission with wildcard", () => {
      const res = check("test.test.*", {test: {"*": {_: false}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard", () => {
      const res = check("test.test.*", {test: {test: {"*": {_: false}}}});
      assert.strictEqual(res, false);
    });
    it("allow for double permission with with deep obj and wildcard", () => {
      const res = check("test.test.*", {test: {test: {"*": {_: true}}}});
      assert.strictEqual(res, true);
    });
    it("Deny for double permission * with with deep obj without wildcard", () => {
      const res = check("test.test.*", {test: {test: {test2: {_: true}}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard", () => {
      const res = check("test.test.*", {test: {test: {test2: {_: false}}}});
      assert.strictEqual(res, false);
    });
  });
  describe("triple string 'test.test2.test3' permission", () => {
    it("allow for double permission with deep obj", () => {
      const res = check("test.test2.test3", {test: {test2: {test3: {_: true}}}});
      assert.strictEqual(res, true);
    });
    it("disallow for double permission with deep obj", () => {
      const res = check("test.test2.test3", {test: {test2: {test3: {_: false}}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard", () => {
      const res = check("test.test2.test3", {test: {test2: {"*": {_: false}}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard in the middle", () => {
      //test3 should be more prioritized than "*"
      const res = check("test.test2.test3", {test: {"*": {"*": {_: true}, test3: {_: false}}}});
      assert.strictEqual(res, false);
    });
    it("disallow for double permission with deep obj and wildcard in the middle 2", () => {
      //test3 should be more prioritized than "*"
      const res = check("test.test2.test3", {test: {"*": {"*": {_: false}, test3: {_: true}}}});
      assert.strictEqual(res, true);
    });
  });
  describe("permission query with '$'", () => {
    it("allow single string permission with single true object", () => {
      const res = check("$", {test: {_: true}});
      assert.strictEqual(res, true);
    });
    it("deny single string permission with single true object", () => {
      const res = check("$", {test: {_: false}});
      assert.strictEqual(res, false);
    });
    it("allow single string permission with single true wildcard object", () => {
      const res = check("$", {"*": {_: true}});
      assert.strictEqual(res, true);
    });
    it("deny single string permission with single false wildcard object", () => {
      const res = check("$", {"*": {_: false}});
      assert.strictEqual(res, false);
    });
    it("allow single string permission with $ at the end and single double true object", () => {
      const res = check("test.$", {test: {test2: {_: true}}});
      assert.strictEqual(res, true);
    });
    it("deny single string permission with $ at the end and single double false object", () => {
      const res = check("test.$", {test: {test2: {_: false}}});
      assert.strictEqual(res, false);
    });

    it("allow single string permission with $ in the middle and single double true object", () => {
      const res = check("test.$.test", {test: {test2: {test: {_: true}}}});
      assert.strictEqual(res, true);
    });
    it("deny single string permission with $ in the middle and single double false object", () => {
      const res = check("test.$.test", {test: {test2: {test: {_: false}}}});
      assert.strictEqual(res, false);
    });

    it("allow single string permission with $ in the middle and single double true object with wildcard", () => {
      const res = check("test.$.test", {test: {"*": {test: {_: true}}}});
      assert.strictEqual(res, true);
    });
    it("deny single string permission with $ in the middle and single double false object with wildcard", () => {
      const res = check("test.$.test", {test: {"*": {test: {_: false}}}});
      assert.strictEqual(res, false);
    });
  })
  describe("Miscellaneous", () => {
    it("allow for triple permission with deep obj and wildcard in the middle", () => {
      const res = check("test.xxx.test3", {test: {"*": {"*": {_: true}}, test3: {_: false}}});
      assert.strictEqual(res, true);
    });
    it("disallow for double permission with deep obj and wildcard in the middle", () => {
      const res = check("test2.xxx.test3", {test: {"*": {"*": {_: true}, test3: {_: false}}}});
      assert.strictEqual(res, false);
    });
    it("allow for single permission with deep obj and wildcard in the middle", () => {
      const res = check("xxx", {xxx: {"*": {"*": {_: true}}, test3: {_: false}}});
      assert.strictEqual(res, true);
    });

    it("allow for x.*.* permission with deep obj and wildcard in the middle", () => {
      const res = check("xxx.*.*", {xxx: {"*": {"*": {_: true}, test3: {_: false}}}});
      assert.strictEqual(res, true);
    });
    it("allow for $ and * permission with deep obj and wildcard in the middle", () => {
      const res = check("xxx.$.test.*", {xxx: {"*": {"*": {_: false}, test3: {_: true}}}});
      assert.strictEqual(res, false);
    });
    it("allow for $ and * permission with deep obj and two wildcard in the middle", () => {
      const res = check("xxx.$.test.*", {xxx: {"*": {"*": {_: true}, test3: {_: false}}}});
      assert.strictEqual(res, true);
    });
    it("deny for $ with double permission with deep obj and wildcard in the middle", () => {
      const res = check("xxx.$.test.test3", {xxx: {"*": {"*": {"*" : {_: true}, test3: {_: false}}}}});
      assert.strictEqual(res, false);
    });
  })
});
