import {PermObject} from "./interfaces/permObject";
import get from "./get";

/**
 * Function to check if PermObject has permissions string
 * @param {string} permission - The string to check if permsObject has
 * @param {PermObject} perms - The object to check permission string against
 * @author Nico Wagner, Jens Hummel
 * @version 1.0.0
 * @since 25.08.2021 23:50
 */
export default function (permission: string, perms: PermObject) {
  return get(permission, perms) !== null;
}
