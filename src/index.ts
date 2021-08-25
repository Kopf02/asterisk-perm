import check from "./check"
import set from "./set";
import unset from "./unset";
import {PermObject} from "./interfaces/permObject";

/**
 * Class wrapper for functions, so you do not have to pass the permObject every time to the function
 * @author Nico Wagner
 * @version 1.0.0
 * @since 1.0.0 24.08.2021
 * @class
 */
class PermClass {
  private _obj: PermObject;

  constructor(obj?: PermObject) {
    if (obj) this._obj = obj;
    else this._obj = {};
  }

  public get obj(): PermObject {
    return this._obj;
  }

  /**
   * Set a Permission in the Permissions Trie
   * @param {string} permission - String representing the permission
   * @param {boolean} value - True / False for positive and negative Permissions
   * @param {boolean} returnValue - if true, return the result of the set function: Returns True if newly set and
   * False if updated,otherwise this
   * @return boolean - Returns True if newly set and False if updated
   */
  set(permission: string, value: boolean, returnValue: true): boolean
  /**
   * Set a Permission in the Permissions Trie
   * @param {string} permission - String representing the permission
   * @param {boolean} value - True / False for positive and negative Permissions
   * @return this - Returns PermClass
   */
  set(permission: string, value: boolean): this
  set(permission: string, value: boolean, returnValue?: boolean): boolean | this {
    if (returnValue === true) {
      return set(permission, value, this._obj);
    }
    set(permission, value, this._obj);
    return this;
  }

  /**
   * Unset a Permission in the Permissions Trie
   * @param {string} permission String representing the permission
   * @param {boolean} returnValue if true, return result of unset function: True if Removed, False if permission
   * didn't existed, if false / undefined, return this
   * @return boolean True if Removed, False if permission didn't existed
   */
  unset(permission: string, returnValue: true): boolean
  /**
   * Unset a Permission in the Permissions Trie
   * @param {string} permission String representing the permission
   * @return this - Returns PermClass
   */

  unset(permission: string): this
  unset(permission: string, returnValue?: true): boolean | this {
    if (returnValue === true) {
      return unset(permission, this._obj);
    }
    unset(permission, this._obj);
    return this;
  }

  /**
   * Tests if permission is given in object and is true
   * @param {string} permission - The permission string to check for in object
   * @param {boolean} returnValue - If true, return check result of function, if false, return this
   * @return {boolean} - The check result of the function [true if permission is given and valid, false if
   * permission is denied]
   */
  check(permission: string, returnValue: true): boolean
  /**
   * Tests if permission is given in object and is true
   * @param {string} permission - The permission string to check for in object
   * @return this - Returns PermClass
   */
  check(permission: string): this
  check(permission: string, returnValue?: boolean): boolean | this {
    if (returnValue) {
      return check(permission, this._obj);
    }
    check(permission, this._obj);
    return this;
  }
}

// export function for static usage
export {
  check,
  set,
  unset,
  PermClass
};

export default PermClass;
