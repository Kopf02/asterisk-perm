/*export interface PermObject {
  _: boolean;
  [index: string]: PermObject;
}*/


export interface PermObject {
  _?: boolean;
  [key: string]: PermObject | boolean;
}
