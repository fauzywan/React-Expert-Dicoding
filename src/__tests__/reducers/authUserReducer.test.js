import { describe, it, expect } from 'vitest';
import authUserReducer from '../../states/authUser/authUserSlice';

describe('authUserReducer function', () => {
  it('should return null as the initial state when given an unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the user data when given by SET_AUTH_USER action', () => {
    const initialState = null;
    const action = {
      type: 'authUser/setAuthUser',
      payload: {
        id: 'user-1',
        name: 'Iwan Fauzy',
        email: 'iwan@test.com',
        avatar: 'https://generated-image-url.jpg',
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    const initialState = { id: 'user-1', name: 'Iwan Fauzy' };
    const action = { type: 'authUser/unsetAuthUser' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
