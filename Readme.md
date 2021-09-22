# asterisk-perm

### A permission string system to check for authentication / authorization

### Usage:

Check for permission:
```typescript
const permissionString = "test.test";
const avaiablePermissions = {test: {test: true}};

const result: boolean = set(permissionString, avaiablePermissions);
if (result) {
    //permisionString is a valid permission in avaiablePermissions
} else {
    //permisionString is not a valid permission in avaiablePermissions
}
```

### Other

- run unit-tests with `npm test`

### Contribution
- Maintainer and creator of this repository: @kopf02
- Writing of unit tests and help with this project: @nico


&copy; 2021 Jens Hummel
