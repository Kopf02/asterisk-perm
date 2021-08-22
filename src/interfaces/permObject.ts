/*export interface PermObject {
  _: boolean;
  [index: string]: PermObject;
}*/

interface Perms { //irgendwie muss das optional sein
  [key: string]: PermObject;
}

export type PermObject = Perms | {
  _?: boolean;
};
