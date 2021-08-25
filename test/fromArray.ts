import fromArray from "../src/fromArray";
import * as assert from "assert";

describe('fromArray toJson tests', () => {
  it('fromArray 1', () => {
    const res = fromArray(["test"]);
    assert.deepStrictEqual(res, {test: true});
  });

  it('fromArray 2', () => {
    const res = fromArray(["test", "test.test2"]);
    assert.deepStrictEqual(res, {test: {_:true, test2: true}});
  })

  it('fromArray 3', () => {
    const res = fromArray(["test", "test.test2.*"]);
    assert.deepStrictEqual(res, {test: {_:true, test2: {"*": true}}});
  })

  it('fromArray 4', () => {
    const res = fromArray(["test", "-test2"]);
    assert.deepStrictEqual(res, {test: true, test2: false});
  })

  it('fromArray 5', () => {
    const res = fromArray(["test", "-test2", "-test.test2.*"]);
    assert.deepStrictEqual(res, {test: {_:true, test2: {"*": false}}, test2: false});
  })

  it('fromArray 6', () => {
    const res = fromArray(["test.test5.test1.*", "-test.test5.test1"]);
    assert.deepStrictEqual(res, {test: {test5: {test1: {_: false, "*": true}}}});
  })
});
