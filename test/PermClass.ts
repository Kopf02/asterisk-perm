import {PermClass} from "../src";
import * as assert from "assert";

describe("PermClass integration test", () => {
  let permClass: PermClass;
  before(() => {
    permClass = new PermClass({
      test: {
        test2: false,
        "*": true,
        _: false
      }
    });
  });
  //SET
  it("set test.test2 to true", () => {
    const res = permClass.set("test.test2", true, true);
    assert.strictEqual(res, false, "Permission key does not exist");
    assert.deepStrictEqual(permClass.obj, {test: {test2: true, "*": true, _: false}}, "Permission Object not updated" +
      " correctly");
  });
  it("set test.* to false", () => {
    const res = permClass.set("test.*", false, true);
    assert.strictEqual(res, false, "Permission key does not exist");
    assert.deepStrictEqual(permClass.obj, {test: {test2: true, "*": false, _: false}}, "Permission Object not updated" +
      " correctly");
  });
  it("set test to true", () => {
    const res = permClass.set("test", true, true);
    assert.strictEqual(res, false, "Permission key does not exist");
    assert.deepStrictEqual(permClass.obj, {test: {test2: true, "*": false, _: true}}, "Permission Object not updated" +
      " correctly");
  });
  //UNSET
  it("unset test.test2", () => {
    const res = permClass.unset("test.test2", true);
    assert.strictEqual(res, true, "Permission key does not exist");
    assert.deepStrictEqual(permClass.obj, {test: {"*": false, _: true}}, "Permission Object not updated" +
      " correctly");
  });
  it("unset test.*", () => {
    const res = permClass.unset("test.*", true);
    assert.strictEqual(res, true, "Permission key does not exist");
    assert.deepStrictEqual(permClass.obj, {test: {_: true}}, "Permission Object not updated" +
      " correctly");
  });
  it("unset test", () => {
    const res = permClass.unset("test", true);
    assert.strictEqual(res, true, "Permission key does not exist");
    assert.deepStrictEqual(permClass.obj, {}, "Permission Object not updated" +
      " correctly");
  });
  //SET AGAIN
  it("set test.test2", () => {
    const res = permClass.set("test.test2", true, true);
    assert.strictEqual(res, true, "Permission was updated, but should be newly created");
    assert.deepStrictEqual(permClass.obj, {test: {test2: true}}, "Permission Object not updated" +
      " correctly");
  });
  //CHECK FOR PERMISSION
  it("check for test.test2 = true", () => {
    const res = permClass.check("test.test2", true);
    assert.strictEqual(res, true, "Permission should be true");
  });
  it("check for test = false", () => {
    const res = permClass.check("test", true);
    assert.strictEqual(res, false, "Permission should be true");
  });
});
