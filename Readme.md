# asterisk-perm

## A permission string system to check for authentication / authorization

## Example-Usage:

Check for permission:
```typescript
import { set } from "asterisk-perm";
const permissionString = "test.test";
const avaiablePermissions = { test: { test: true } };

const result: boolean = set(permissionString, avaiablePermissions);
if (result) {
    //permisionString is a valid permission in avaiablePermissions
} else {
    //permisionString is not a valid permission in avaiablePermissions
}
```


## Documentation for static functions
- `set(permission: string, value: boolean, perms: PermObject): boolean`
  - `permission` - the string which should be set
  - `value` - if the given `permission` string should have a value of `true` or `false`
  - `perms` - the `PermObject` where the permission should be saved
  - _Return:_ `true` if newly set and `false` if updated
- `unset(permission: string,  perms: PermObject): boolean`
  - `permission` - the string which should be unset
  - `perms` - the `PermObject` where the permission should be unset from
  - _Return:_  `true` if Removed, `false` if permission didn't existed
- `get(permission: string, perms: PermObject): boolean | null`
  - `permission` - the string which should be fetched
  - `perms` - the `PermObject` where the permission should be read from
  - _Return:_ `{boolean | null}` Value of Permission or null if not set
- `check(permission: string, perms: PermObject): boolean`
  - `permission` - the string which should be tested
  - `perms` - the `PermObject` where the permission should be used for testing
  - _Return:_ `true` if the permission is true, `false` if permission is false or not set
- `has(permission: string, perms: PermObject): boolean`
  - `permission` - the string which should be tested
  - `perms` - the `PermObject` where the permission should be used for testing
  - _Return:_ `true` if permission is set, `false` if permission is not set
    - **Note:** does not check if permission is true or false

## Documentation for Class-Usage
### This is the schema, which functions are avaiable in the class
```typescript
class PermClass {
  constructor(array: string[])
  constructor(obj: PermObject)
  constructor()
  constructor(obj?: PermObject | string[])

  get obj(): PermObject

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
  set(permission: string, value: boolean, returnValue?: boolean): boolean | this

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
  unset(permission: string, returnValue?: true): boolean | this

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
  check(permission: string, returnValue?: boolean): boolean | this

  /**
   * Function to check if permsObject has given permission set
   * @param permission
   * @return boolean - True if permission is set, false if unset (not-set)
   */
  has(permission: string)

  /**
   * check if permission string is set in PermObject or not
   * @param permission
   * @return {boolean | null} - Null if not set, otherwise return the value of the permission
   */
  get(permission: string)
  /**
   * Function to Serialize the Class to an array of full-length-permissions string
   * @return string[]
   */
  toArray()

  /**
   * Converts Array to PermClass Object
   * @param {string[]} permissions - Permission Array
   * @return PermClass
   */
  static fromArray(permissions: string[])
}
```


## Complex Examples
```typescript
import { PermClass } from "asterisk-perm";

const permClass = new PermClass(
    {
        "test": {
            "test2": true
        }
    }
);

permClass.set("test.test3", true) //return permClass
permClass.set("test.test3", true, true) //return permClass

permClass.unset("test.test3") //return true
permClass.unset("test.missing") //return false
permClass.unset("test.test3", true) //return permClass

permClass.check("test.test2") //return true
permClass.check("test.missing") //return false
permClass.check("test.test2", true) //return permClass

permClass.has("test.test2") //return true
permClass.has("test.mising") //return false
permClass.has("test.test2", true) //return permClass

permClass.get("test.test2") //return true
permClass.get("test.missing") //return null


permClass.toArray() //return ["test.test2"]

PermClass.fromArray(["testing.test"]) //return PermClass with PermClass.obj => { testing: { test2: true } }

```

### Other

- run unit-tests with `npm test`

### Contribution
- Maintainer and creator of this repository: [@Kopf02](https://github.com/kopf02)
- Writing of unit tests, this readme and help with this project: [@Trickfilm400](https://github.com/trickfilm400)


&copy; 2021 Jens Hummel
