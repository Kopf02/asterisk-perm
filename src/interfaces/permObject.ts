export interface PermObject {
  _?: boolean;
  [key: string]: PermObject | boolean;
}
