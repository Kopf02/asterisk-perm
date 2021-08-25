import {PermObject} from "./interfaces/permObject";

/**
 * Checks if permission is set in permObject
 * @param permission
 * @param perms
 * @return {boolean | null} Value of Permission or null if not set
 * @author Jens Hummel
 * @version 1.0.0
 * @since 25.08.2021 23:67
 */
export default function (permission: string, perms: PermObject): boolean | null {
  let permissionArray: string[] = permission.split('.');

  while (permissionArray.length > 1) {
    let element = permissionArray.shift();
    let value = perms[element];
    if (value === undefined || typeof value === 'boolean') return null;
    perms = value;
  }

  let element = permissionArray.shift();
  let value = perms[element];
  if (typeof value === 'boolean')
    return value;
  if (typeof value === 'object' && value._ !== undefined)
    return value._;
  return null;
}
