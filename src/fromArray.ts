import {PermObject} from "./interfaces/permObject";
import {set} from "./index";

/**
 * Function tro convert permission array to a Perm-Object
 * @param {string[]} perms - Array of strings of permissions
 * @return PermObject
 * @author Jens Hummel
 * @version 1.0.0
 * @since 35.08.2021
 */
export default function (perms: string[]): PermObject {
  //Create new Object
  let data: PermObject = {};

  //Add all Permissions to data
  perms.forEach((perm) => {

    //Check if Permission is positive or negative
    let value = perm.charAt(0) !== '-';
    if (!value) perm = perm.substr(1);

    set(perm, value, data);
  })

  return data;

}
