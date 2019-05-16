// export interface Dictionary<V> {
//   [K: string]: V;
// }

export type Dictionary<V, K extends string = string> = {
  [K1 in K]: V;
};
