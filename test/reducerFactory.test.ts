import { actionCreator } from '../src/actionCreator';
import { reducerFactory } from '../src/reducerFactory';

interface ICounterState {
  counter: number;
}

const counterInitialState: ICounterState = {
  counter: 0,
};

const increment = actionCreator<{}>('increment');

describe('reducerFactory', () => {
  describe('when calling with an action that has not been added to handlers', () => {
    it('then it should return initalState', () => {
      // Arrange
      const counterReducer = reducerFactory<ICounterState>(counterInitialState)
        .addActionHandler({
          actionCreator: increment,
          actionHandler: ({ state }) => ({
            ...state,
            counter: state.counter + 1,
          }),
        })
        .create();

      // Act
      const resultingState = counterReducer(counterInitialState, { type: 'unknown', payload: null });

      // Assert
      expect(resultingState).toEqual({ counter: 0 });
    });
  });

  describe('when calling with an action that has been added to handlers', () => {
    it('then it should return resulting state', () => {
      // Arrange
      const counterReducer = reducerFactory<ICounterState>(counterInitialState)
        .addActionHandler({
          actionCreator: increment,
          actionHandler: ({ state }) => ({
            ...state,
            counter: state.counter + 1,
          }),
        })
        .create();

      // Act
      const resultingState = counterReducer(counterInitialState, increment({}));

      // Assert
      expect(resultingState).toEqual({ counter: 1 });
    });
  });

  describe('when calling with an action that has been added as two handlers', () => {
    it('then it should return resulting state', () => {
      // Arrange
      const counterReducer = reducerFactory<ICounterState>(counterInitialState)
        .addActionHandler({
          actionCreator: increment,
          actionHandler: ({ state }) => ({
            ...state,
            counter: state.counter + 1,
          }),
        })
        .addActionHandler({
          actionCreator: increment,
          actionHandler: ({ state }) => ({
            ...state,
            counter: state.counter - 1,
          }),
        })
        .create();

      // Act
      const resultingState = counterReducer(counterInitialState, increment({}));

      // Assert
      expect(resultingState).toEqual({ counter: 0 });
    });
  });
});
