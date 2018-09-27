import { Reducer } from 'redux';
import { IAction, IActionCreator } from './actionCreator';

interface IActionHandler<State, Payload> {
  state: State;
  action: IAction<Payload>;
}

interface IActionHandlerConfig<State, Payload> {
  actionCreator: IActionCreator<Payload>;
  actionHandler: (handler: IActionHandler<State, Payload>) => State;
}

export interface IAddActionHandler<State> {
  addActionHandler: <Payload>(config: IActionHandlerConfig<State, Payload>) => ICreateReducer<State>;
}

export interface ICreateReducer<State> extends IAddActionHandler<State> {
  create: () => Reducer<State, IAction<any>>;
}

export const reducerFactory = <State>(initialState: State): IAddActionHandler<State> => {
  const actionHandlerConfigs: Array<IActionHandlerConfig<State, any>> = [];

  const addActionHandler = <Payload>(config: IActionHandlerConfig<State, Payload>): ICreateReducer<State> => {
    actionHandlerConfigs.push(config);

    return instance;
  };

  const create = (): Reducer<State, IAction<any>> => {
    const reducer: Reducer<State, IAction<any>> = (state: State = initialState, action: IAction<any>) => {
      const handlers = actionHandlerConfigs
        .filter((config) => config.actionCreator.type === action.type)
        .map((config) => config.actionHandler);
      return handlers.reduce((currentState, handler) => {
        return handler({ state: currentState, action });
      }, state);
    };

    return reducer;
  };

  const instance: ICreateReducer<State> = {
    addActionHandler,
    create,
  };

  return instance;
};
