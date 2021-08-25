import has from "../src/has";
import * as assert from "assert";

describe("has Tests", () => {
  it('check if permission is set',  () => {
    const res = has("test.test", {test: false});
    assert.strictEqual(res, false, "element should not exists");
  });
  it('check if permission is set 2',  () => {
    const res = has("test.test", {test: {test: true}});
    assert.strictEqual(res,true, "element should exists");
  });
  it('check if permission is set 3',  () => {
    const res = has("test.test", {test: {test: false}});
    assert.strictEqual(res, true, "element should not exists");
  });
  it('check if permission is set 4',  () => {
    const res = has("test.test.*", {test: {test: {"*": true}}});
    assert.strictEqual(res, true, "element should exists");
  });
})
