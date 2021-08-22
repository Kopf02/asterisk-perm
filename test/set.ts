import set from "../src/set";
import {PermObject} from "../src/interfaces/permObject";
import * as assert from "assert";

describe.skip("Set permissions to obj", () => {

  let data: PermObject;

  beforeEach('Data preparation', () => {
    data = {test: true}
  })

  it("save new true value to obj", () => {
    let res = set("test2", true, data);
    assert.strictEqual(data, {test: true, test2: true}, 'Verify Permission Object Data');
    assert.strictEqual(res, true, 'Marked as new Entry')
  });
  it("save new false value to obj", () => {
    let res = set("test2", false, data);
    assert.strictEqual(data, {test: true, test2: false}, 'Verify Permission Object Data');
    assert.strictEqual(res, true, 'Marked as new Entry')
  });
  it("save new nested true value to obj", () => {
    let res = set("test2.test3", true, data);
    assert.strictEqual(data, {test: true, test2: {test3: true}}, 'Verify Permission Object Data');
    assert.strictEqual(res, true, 'Marked as new Entry')
  });
  it("save new nested false value to obj", () => {
    let res = set("test2.test3", false, data);
    assert.strictEqual(data, {test: true, test2: {test3: false}}, 'Verify Permission Object Data');
    assert.strictEqual(res, true, 'Marked as new Entry')
  });
})
