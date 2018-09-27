export interface IAction<T> {
  readonly type: string;
  readonly payload: T;
}

export interface IActionCreator<T> {
  readonly type: string;
  (payload: T): IAction<T>;
}

export const actionCreator = <T>(type: string): IActionCreator<T> =>
  Object.assign((payload: T): IAction<T> => ({ type, payload }), { type });
