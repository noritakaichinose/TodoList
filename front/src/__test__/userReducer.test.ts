import { reducer, initialState, State, Action } from '../reducers/userReducer';

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as Action)).toEqual(initialState);
  });

  it('should handle SET_USER_DETAILS', () => {
    const userDetails = { username: 'testuser', email: 'testuser@example.com' };
    const action: Action = { type: 'SET_USER_DETAILS', payload: userDetails };
    const expectedState: State = {
      ...initialState,
      username: userDetails.username,
      currentEmail: userDetails.email,
      email: userDetails.email,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_FORM', () => {
    const modifiedState: State = {
      ...initialState,
      email: 'modified@example.com',
      password: 'password',
      error: 'Some error',
      success: 'Some success',
      isEditing: true,
      open: true,
    };

    const action: Action = { type: 'RESET_FORM' };
    const expectedState: State = {
      ...initialState,
      email: '',
      password: '',
      error: null,
      success: null,
      isEditing: false,
      open: false,
    };

    expect(reducer(modifiedState, action)).toEqual(expectedState);
  });
});
