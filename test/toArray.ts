import { PermObject } from '../src/interfaces/permObject';
import toArray from '../src/toArray';
import * as assert from 'assert';

describe('toArray Tests', () => {
  it('toArray 1', () => {
    const testData: PermObject = {
      test: true,
      test2: true,
    };
    const res = toArray(testData);
    assert.deepStrictEqual(res.sort(), ['test', 'test2'].sort());
  });

  it('toArray 2', () => {
    const testData: PermObject = {
      test: true,
      test2: true,
      _: false,
    };
    const res = toArray(testData);
    assert.deepStrictEqual(res.sort(), ['-', 'test', 'test2'].sort());
  });

  it('toArray 3', () => {
    const testData: PermObject = {
      test: true,
      test2: {
        test3: false,
        _: true,
      },
    };
    const res = toArray(testData);
    assert.deepStrictEqual(res.sort(), ['test', 'test2', '-test2.test3'].sort());
  });

  it('toArray 4', () => {
    const testData: PermObject = {
      test: true,
      test2: {
        test3: false,
        _: true,
        '*': true,
      },
    };
    const res = toArray(testData);
    assert.deepStrictEqual(res.sort(), ['test', 'test2.*', 'test2', '-test2.test3'].sort());
  });

  it('toArray 5', () => {
    const testData: PermObject = {
      test: true,
      test2: {
        _: true,
        '*': true,
        test3: {
          '*': false,
          _: true,
        },
      },
    };
    const res = toArray(testData);
    assert.deepStrictEqual(res.sort(), ['test', 'test2.*', 'test2', 'test2.test3', '-test2.test3.*'].sort());
  });
});
