import {PermObject} from "./interfaces/permObject";
import {PermAction} from "./interfaces/permAction";

function checkRec(permission: string[],  perms: PermObject | boolean, wildcard: boolean = false): PermAction | undefined {
  if (typeof perms === 'boolean' && (permission.length == 0 || wildcard === true)) return {action: perms, depth: wildcard ? -1 : 0}; // Exakter Match oder Finale Wildcard
  if (typeof perms === 'boolean' && permission.length > 0) return undefined; // Ende von Baum erreicht ohne Treffer

  let results: PermAction[] = [];
  if (typeof perms !== 'boolean' && perms['*'] !== undefined) results.push(checkRec(permission.slice(1), perms['*'], true));
  if (typeof perms !== 'boolean' && perms[permission[0]] !== undefined) results.push(checkRec(permission.slice(1), perms[permission[0]]));

  return results.reduce((prev, curr) => curr.depth > prev.depth ? curr : prev);

}

export default function (permission: string, perms: PermObject): boolean {
  return checkRec(permission.split("."), perms).action || false;
}
