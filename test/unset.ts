import {PermObject} from "../src/interfaces/permObject";
import unset from "../src/unset";
import assert from "assert";

describe("Unset permissions to obj", () => {

  describe('Unset existing values', () => {
    let data: PermObject;

    beforeEach('Data preparation', () => {
      data = {test: {_: true, test2: {test3: false}, test9: false}};
    });
    it("remove root value from deep nested obj", () => {
      let res = unset("test", data);
      assert.deepStrictEqual(data, {test: {test2: {test3: false}, test9: false}}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Element should exist and deleted');
    });
    it("remove root.root value from deep nested obj", () => {
      let res = unset("test.test9", data);
      assert.deepStrictEqual(data, {test: {_: true, test2: {test3: false}}}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Element should not exist');
    });
    it("remove existing value from deep nested obj", () => {
      let res = unset("test.test2.test3", data);
      assert.deepStrictEqual(data, {test: {_: true, test9: false}}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Element should exist and deleted');
    });

  });
  describe("Unset non existing values", () => {
    let data: PermObject;

    beforeEach('Data preparation', () => {
      data = {test: {_: true, test2: {test3: false}, test9: false}};
    });
    it("remove non existing root value from obj", () => {
      let res = unset("test.test2", data);
      assert.deepStrictEqual(data, {
        test: {
          _: true,
          test2: {test3: false},
          test9: false
        }
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Element should not exist');
    });
    it("remove non existing root value from deep nested obj", () => {
      let res = unset("test2", data);
      assert.deepStrictEqual(data, {
        test: {
          _: true,
          test2: {test3: false},
          test9: false
        }
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Element should not exist');
    });
    it("remove non existing value from obj", () => {
      let res = unset("test2.test3", data);
      assert.deepStrictEqual(data, {
        test: {
          _: true,
          test2: {test3: false},
          test9: false
        }
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Element should not exist');
    });
  });
  describe("Delete * permission", () => {
    let data: PermObject;

    beforeEach('Data preparation', () => {
      data = {test: {_: true, test2: {"*": false}, test9: false}};
    });

    it("remove star value from deep nested obj", () => {
      let res = unset("test.test2.*", data);
      assert.deepStrictEqual(data, {test: {_: true, test9: false}}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Element should exist and deleted');
    });
  });
});
