import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => {
      return action.payload;
    },
    addThread: (state, action) => {
      return [action.payload, ...state];
    },
    toggleUpvoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.upVotesBy.includes(userId)) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy.push(userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownvoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.downVotesBy.includes(userId)) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy.push(userId);
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
  },
});

export const {
  receiveThreads,
  addThread,
  toggleUpvoteThread,
  toggleDownvoteThread,
} = threadsSlice.actions;

export function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));

    try {
      const thread = getState().threads.find((t) => t.id === threadId);

      if (thread.downVotesBy.includes(authUser.id)) {
        await api.downvoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
    }
  };
}
export function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));

    try {
      const thread = getState().threads.find((t) => t.id === threadId);
      if (thread.upVotesBy.includes(authUser.id)) {
        await api.upvoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
    }
  };
}

export function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });

      dispatch(addThread(thread));

      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
}

export default threadsSlice.reducer;
