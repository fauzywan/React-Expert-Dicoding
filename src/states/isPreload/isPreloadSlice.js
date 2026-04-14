import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUser } from '../authUser/authUserSlice';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}

export default isPreloadSlice.reducer;
