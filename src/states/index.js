import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/authUserSlice';
import isPreloadReducer from './isPreload/isPreloadSlice';
import usersReducer from './users/usersSlice';
import threadsReducer from './threads/threadsSlice';
import threadDetailReducer from './threads/threadDetailSlice';
import leaderboardsReducer from './leaderboards/leaderboardsSlice';
const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
