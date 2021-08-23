import set from "../src/set";
import {PermObject} from "../src/interfaces/permObject";
import * as assert from "assert";

describe("Set permissions to obj", () => {

  describe('Set none existing values', () => {
    let data: PermObject;

    beforeEach('Data preparation', () => {
      data = {test: true}
    })

    it("save new true value to obj", () => {
      let res = set("test2", true, data);
      assert.deepStrictEqual(data, {test: true, test2: true}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
    it("save new false value to obj", () => {
      let res = set("test2", false, data);
      assert.deepStrictEqual(data, {test: true, test2: false}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
    it("save new nested true value to obj", () => {
      let res = set("test2.test3", true, data);
      assert.deepStrictEqual(data, {test: true, test2: {test3: true}}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
    it("save new nested false value to obj", () => {
      let res = set("test2.test3", false, data);
      assert.deepStrictEqual(data, {test: true, test2: {test3: false}}, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
  });

  describe('Set already existing values', () => {
    let data: PermObject;

    beforeEach('Data preparation', () => {
      data = {test: true, test2: false, test3: {test: true}}
    })

    it("update true value to obj", () => {
      let res = set("test2", true, data);
      assert.deepStrictEqual(data, {test: true, test2: true, test3: {test: true}}, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Marked as updated')
    });
    it("update false value to obj", () => {
      let res = set("test2", false, data);
      assert.deepStrictEqual(data, {test: true, test2: false, test3: {test: true}}, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Marked as updated')
    });
    it("save new nested true value to obj", () => {
      let res = set("test3.test", true, data);
      assert.deepStrictEqual(data, {test: true, test2: false, test3: {test: true}}, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Marked as updated')
    });
    it("save new nested false value to obj", () => {
      let res = set("test3.test", false, data);
      assert.deepStrictEqual(data, {test: true, test2: false, test3: {test: false}}, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Marked as updated')
    });
  });

  describe('Add nested Permissions to root Permission', () => {
    let data: PermObject;

    beforeEach('Data preparation', () => {
      data = {test: true, test2: false, test3: {test: true}}
    })

    it("update true value to obj", () => {
      let res = set("test2.test", true, data);
      assert.deepStrictEqual(data, {
        test: true,
        test2: {_: false, test: true},
        test3: {test: true}
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
    it("update false value to obj", () => {
      let res = set("test2.test", false, data);
      assert.deepStrictEqual(data, {
        test: true,
        test2: {_: false, test: false},
        test3: {test: true}
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
    it("save new nested true value to obj", () => {
      let res = set("test3.test.hallo", true, data);
      assert.deepStrictEqual(data, {
        test: true,
        test2: false,
        test3: {test: {_: true, hallo: true}}
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
    it("save new nested false value to obj", () => {
      let res = set("test3.test.hallo", false, data);
      assert.deepStrictEqual(data, {
        test: true,
        test2: false,
        test3: {test: {_: true, hallo: false}}
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry')
    });
  });

  describe('Set root element in nested Permission', () => {
    let data: PermObject;

    beforeEach('Data preparation', () => {
      data = {test: {test2: {_: true, hallo: false}, test3: {_: false, hallo: true}}}
    })

    it("Add true value to already nested obj", () => {
      let res = set("test", true, data);
      assert.deepStrictEqual(data, {
        test: {
          _: true,
          test2: {_: true, hallo: false},
          test3: {_: false, hallo: true}
        }
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry');
    });

    it("Add false value to already nested obj", () => {
      let res = set("test", false, data);
      assert.deepStrictEqual(data, {
        test: {
          _: false,
          test2: {_: true, hallo: false},
          test3: {_: false, hallo: true}
        }
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, true, 'Marked as new Entry');
    });

    it("Update nested true value to obj", () => {
      let res = set("test.test2", false, data);
      assert.deepStrictEqual(data, {
        test: {
          test2: {_: false, hallo: false},
          test3: {_: false, hallo: true}
        }
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Marked as updated');
    });

    it("save new nested false value to obj", () => {
      let res = set("test.test3", true, data);
      assert.deepStrictEqual(data, {
        test: {
          test2: {_: true, hallo: false},
          test3: {_: true, hallo: true}
        }
      }, 'Verify Permission Object Data');
      assert.strictEqual(res, false, 'Marked as updated');
    });
  });


})
