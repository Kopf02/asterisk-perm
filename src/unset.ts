import {PermObject} from "./interfaces/permObject";

/***
 * Unset a Permission in the Permissions Trie
 *
 * @param permission String representing the permission
 * @param perms Permissions Object
 * @return boolean True if Removed, False if permission didn't existed
 */
export default function (permission: string,  perms: PermObject): boolean {

  let permArray = permission.split('.');
  let handled: {permission: string, perms: PermObject}[] = [];

  let element: string;

  while (permArray.length > 1) {
    element = permArray.shift();
    if (!(element in perms)) return false;
    let x = perms[element];
    if (typeof x === 'boolean') return false;
    handled.push({permission: element, perms})
    perms = x;
  }

  element = permArray.shift();
  if (!(element in perms)) return false;
  let x = perms[element];
  if (typeof x === 'boolean') delete perms[element];
  else if ('_' in x) delete x._;
  else return false;

  while (handled.length > 0) {
    let clean = handled.pop();
    let length = Object.keys(clean.perms[clean.permission]).length;
    if (length === 0) delete clean.perms[clean.permission];
    else break;
  }

  return true;
}
