import { actionCreator } from '../src/actionCreator';

interface IDummy {
  dummy: number;
}

describe('actionCreator', () => {
  describe('when called with a number payload', () => {
    it('then action payload and type should be correct', () => {
      // Arrange
      const incrementActionCreator = actionCreator<number>(
        'incrementActionCreator',
      );

      // Act
      const action = incrementActionCreator(1337);

      // Assert
      expect(action.type).toBe('incrementActionCreator');
      expect(action.payload).toBe(1337);
    });
  });

  describe('when called with a null payload', () => {
    it('then action payload and type should be correct', () => {
      // Arrange
      const nullActionCreator = actionCreator<string>('nullActionCreator');

      // Act
      const action = nullActionCreator((null as any) as string);

      // Assert
      expect(action.type).toBe('nullActionCreator');
      expect(action.payload).toBeNull();
    });
  });

  describe('when called with an undefined payload', () => {
    it('then action payload and type should be correct', () => {
      // Arrange
      const undefinedActionCreator = actionCreator<string>(
        'undefinedActionCreator',
      );

      // Act
      const action = undefinedActionCreator((undefined as any) as string);

      // Assert
      expect(action.type).toBe('undefinedActionCreator');
      expect(action.payload).toBeUndefined();
    });
  });

  describe('when called with an interfaced payload', () => {
    it('then action payload and type should be correct', () => {
      // Arrange
      const dummyActionCreator = actionCreator<IDummy>('dummyActionCreator');

      // Act
      const action = dummyActionCreator({
        dummy: 1337,
      });

      // Assert
      expect(action.type).toBe('dummyActionCreator');
      expect(action.payload).toEqual({ dummy: 1337 });
    });
  });
});
