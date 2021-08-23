import {PermObject} from "./interfaces/permObject";

/***
 * Set a Permission in the Permissions Trie
 *
 * @param {string} permission - String representing the permission
 * @param {boolean} value - True / False for positive and negative Permissions
 * @param {PermObject} perms - Permissions Object
 * @return boolean - Returns True if newly set and False if updated
 */
export default function (permission: string, value: boolean, perms: PermObject): boolean {

  let permArray = permission.split('.');

  let element: string;

  while (permArray.length > 1) {
    element = permArray.shift();
    if (!(element in perms)) {
      perms[element] = {};
      perms = perms[element] as PermObject;
    }
    else {
      let x = perms[element];
      if (typeof x === 'boolean') {
        perms[element] = {_: x};
        perms = perms[element] as PermObject;
      } else {
        perms = x
      }
    }
  }

  element = permArray.shift();

  let result = !(element in perms);
  let x = perms[element];

  if (typeof x === 'boolean' || result) {
    perms[element] = value;
  } else {
    result = !('_' in x);
    x._ = value;
  }



  return result;
}
//todo return new perm object if used as stateless method
