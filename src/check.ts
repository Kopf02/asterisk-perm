import {PermObject} from "./interfaces/permObject";
import {PermAction} from "./interfaces/permAction";

function checkRec(permission: string[], perms: PermObject | boolean, wildcard: boolean = false): PermAction | null {
  if (typeof perms === 'boolean') {
    return {action: perms, depth: permission.length}
  }

  if (permission[0] === '$') {
    let results: PermAction[] = [];
    for (let key in perms) {
      if (perms.hasOwnProperty(key) && key !== '_') {
        let res = checkRec(permission.slice(1), perms[key], key === '*');
        if (res) results.push(res);
      }
    }
    return results.reduce((prev, curr) => curr.depth < prev.depth || prev.depth === -1 ? curr : prev, {depth: -1, action: false});
  }

  if (permission.length > 0 && perms[permission[0]] !== undefined) {
    let res = checkRec(permission.slice(1), perms[permission[0]]);
    if (res) return res;
  }
  if (permission.length === 0 && perms['_'] !== undefined) return checkRec([], perms['_']); //Must the final Call
  if (perms['*'] !== undefined) return checkRec(permission.slice(1), perms['*'], true);
  if (wildcard && perms['_'] !== undefined) return checkRec([], perms['_']);
  return null;


/*  let results: PermAction[] = [];

  results = results.filter(value => typeof value === 'object');

  let result = results.reduce((prev, curr) => curr.depth > prev.depth ? curr : prev, {depth: -1, action: false});
  result.depth++;
  return result;*/

}

export default function (permission: string, perms: PermObject): boolean {
  let res = checkRec(permission.split("."), perms);
  return res === null ? false : res.action;
}
