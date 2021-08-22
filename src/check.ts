import {PermObject} from "./interfaces/permObject";
import {PermAction} from "./interfaces/permAction";

function checkRec(permission: string[], perms: PermObject | boolean, wildcard: boolean = false): PermAction | undefined {
  if (typeof perms === 'boolean') {
    if (permission.length == 0 || wildcard === true) return {action: perms, depth: wildcard ? 0 : 1}; // Exact Match or final Wildcard reached
    return undefined; // End of Tree reached without any match
  }


  let results: PermAction[] = [];
  if (permission[0] === '$') {
    for (let key in perms) {
      if (perms.hasOwnProperty(key))
        results.push(checkRec(permission.slice(1), perms[key], key === '*'));
    }
  } else {
    if (perms['*'] !== undefined) results.push(checkRec(permission.slice(1), perms['*'], true));
    if (perms[permission[0]] !== undefined) results.push(checkRec(permission.slice(1), perms[permission[0]]));
  }


  results = results.filter(value => typeof value === 'object');

  let result = results.reduce((prev, curr) => curr.depth > prev.depth ? curr : prev, {depth: -1, action: false});
  result.depth++;
  return result;

}

export default function (permission: string, perms: PermObject): boolean {
  return checkRec(permission.split("."), perms).action;
}
