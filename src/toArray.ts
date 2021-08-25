import {PermObject} from "./interfaces/permObject";

function toArrayRec(perms: PermObject, collector: Set<string>, parents: string = ''): void {

  let dottedParents = parents.length > 0 ? parents + '.' : parents;

  for (let element in perms) {
    if (!perms.hasOwnProperty(element)) continue;

    let permission = dottedParents + element;
    let value = perms[element];


    if (typeof value === 'boolean') {
      let prefix = value ? '' : '-';
      if (element === '_') collector.add(prefix + parents);
      else collector.add(prefix + permission);
    } else {
      toArrayRec(value, collector, permission)
    }
  }
}


/**
 * Function to convert a PermObject to an array of full-length-permissions string
 * @example
 * ```typescript
 * const array = ["test.test2.*"]
 * ```
 * @param {PermObject} perms
 * @author Jens Hummel
 * @version 1.0.0
 * @since 25.08.2021
 * @return string[]
 */
export default function (perms: PermObject): string[] {
  let collector = new Set<string>();
  toArrayRec(perms, collector);
  return Array.from(collector.values());
}
