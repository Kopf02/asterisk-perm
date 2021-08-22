import {PermObject} from "./interfaces/permObject";
import {PermAction} from "./interfaces/permAction";

function checkRec(permission: string[], perms: PermObject | boolean | undefined, parent: string = null): PermAction | undefined {
  if (typeof perms === 'undefined') return undefined;

  if (typeof perms === 'boolean') {
    if (permission.length == 0 || parent === '*') return {action: perms, depth: parent === '*' ? 0 : 1}; // Exact Match or final Wildcard reached
    return undefined; // End of Tree reached without any match
  }

  let results: PermAction[] = [];

  if (permission[0] === '$') {
    for (let key in perms) {
      if (perms.hasOwnProperty(key) && key !== '_')
        results.push(checkRec(permission.slice(1), perms[key], key));
    }
  } else {
    results.push(checkRec(permission.slice(1), perms['*'], '*'));

    if (permission.length === 0)
      results.push(checkRec(permission.slice(1), perms['_'], '_'));
    else results.push(checkRec(permission.slice(1), perms[permission[0]], permission[0]));
  }


  results = results.filter(value => typeof value === 'object');

  let result = results.reduce((prev, curr) => curr.depth > prev.depth ? curr : prev, {depth: -1, action: false});
  result.depth++;
  return result;

}

export default function (permission: string, perms: PermObject): boolean {
  return checkRec(permission.split("."), perms).action;
}
