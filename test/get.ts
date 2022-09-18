import get from '../src/get';
import * as assert from 'assert';

describe('get Tests', () => {
  it('check if permission is set', () => {
    const res = get('test.test', { test: false });
    assert.strictEqual(res, null, 'element should not exists');
  });
  it('check if permission is set 2', () => {
    const res = get('test.test.test5.*', { test: { '*': false, _: true } });
    assert.strictEqual(res, null, 'element should not exists');
  });
  it('check if permission is set 3', () => {
    const res = get('test.test1', { test: { test1: true } });
    assert.strictEqual(res, true, 'element should exists');
  });
  it('check if permission is set 4', () => {
    const res = get('test2.test', { test2: { test: false } });
    assert.strictEqual(res, false, 'element should exists & be true');
  });
  it('check if permission is set 5', () => {
    const res = get('test.test55.*', { test: { test55: { '*': true } } });
    assert.strictEqual(res, true, 'element should exists');
  });
  it('check if permission is set 6', () => {
    const res = get('test.test', { test: { test: { _: true } } });
    assert.strictEqual(res, true, 'element should exists & be true');
  });
  it('check if permission is set 7', () => {
    const res = get('test', { test: { _: false } });
    assert.strictEqual(res, false, 'element should exists & be false');
  });
});
