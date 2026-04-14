import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    receiveLeaderboards: (state, action) => action.payload,
  },
});

export const { receiveLeaderboards } = leaderboardsSlice.actions;

export function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export default leaderboardsSlice.reducer;
