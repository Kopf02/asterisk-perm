import { PermObject } from './interfaces/permObject';

function toArrayRec(perms: PermObject, collector: Set<string>, parents = ''): void {
  const dottedParents = parents.length > 0 ? parents + '.' : parents;

  for (const element in perms) {
    if (!Object.getOwnPropertyDescriptor(perms, element)) continue;

    const permission = dottedParents + element;
    const value = perms[element];

    if (typeof value === 'boolean') {
      const prefix = value ? '' : '-';
      if (element === '_') collector.add(prefix + parents);
      else collector.add(prefix + permission);
    } else {
      toArrayRec(value, collector, permission);
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
  const collector = new Set<string>();
  toArrayRec(perms, collector);
  return Array.from(collector.values());
}
