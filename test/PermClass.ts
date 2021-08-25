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
  //check for toArray
  it("Check if object gets converted to array correctly", () => {
    const res = permClass.toArray();
    assert.deepStrictEqual(res, ["test.test2"], "Array should match json object");
  })

  describe('fromArray', () => {
    //check for fromArray
    it("Check if object gets converted to json correctly", () => {
      const res = PermClass.fromArray(["test.test.*", "-test.test2"]);
      assert.deepStrictEqual(res.obj, {test: {test: {"*": true}, "test2": false}}, "Array should match json object");
    })
    it("Check if object gets converted to json correctly WITH CONSTRUCTOR", () => {
      const res = new PermClass(["test.test.*", "-test.test2"]);
      assert.deepStrictEqual(res.obj, {test: {test: {"*": true}, "test2": false}}, "Array should match json object");
    })
  });

  describe("get & has", () => {
    it('get: check if permission is set',  () => {
      const res = permClass.get("test.test");
      assert.strictEqual(res, null, "element should not exists");
    });
    it('get: check if permission is set 2',  () => {
      console.log(permClass)
      const res = permClass.get("test.test2");
      assert.strictEqual(res, true, "element should exists");
    });

    it('has: check if permission is set',  () => {
      const res = permClass.has("test.test");
      assert.strictEqual(res, false, "element should not exists");
    });
    it('has: check if permission is set 2',  () => {
      console.log(permClass)
      const res = permClass.has("test.test2");
      assert.strictEqual(res, true, "element should exists");
    });
  })
});
