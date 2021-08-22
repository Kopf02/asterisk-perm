import {PermObject} from "./interfaces/permObject";

/***
 * Set a Permission in the Permissions Trie
 *
 * @param {string} permission - String representing the permission
 * @param {boolean} value - True / False for positive and negative Permissions
 * @param {PermObject} perms - Permissions Object
 * @return boolean - If permission could be set successfully
 */
export default function (permission: string, value: boolean, perms: PermObject): boolean {
  let permArray = permission.split('.');

  return null; //Todo: implement
}
//todo return new perm object if used as stateless method
