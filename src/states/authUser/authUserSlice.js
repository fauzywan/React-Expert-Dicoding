import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => {
      return action.payload;
    },
    unsetAuthUser: () => {
      return null;
    },
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await api.login({ email, password });

      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();

      dispatch(setAuthUser(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncUnsetAuthUser() {
  return (dispatch) => {
    api.putAccessToken('');

    dispatch(unsetAuthUser());
  };
}

export default authUserSlice.reducer;
