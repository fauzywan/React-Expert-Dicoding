import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    toggleUpvoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);

      if (comment) {
        if (comment.upVotesBy.includes(userId)) {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId); // Batal upvote
        } else {
          comment.upVotesBy.push(userId); // Tambah upvote
          comment.downVotesBy = comment.downVotesBy.filter(
            (id) => id !== userId,
          );
        }
      }
    },
    toggleDownvoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);

      if (comment) {
        if (comment.downVotesBy.includes(userId)) {
          comment.downVotesBy = comment.downVotesBy.filter(
            (id) => id !== userId,
          );
        } else {
          comment.downVotesBy.push(userId); // Tambah downvote
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId); // Hapus dari upvote jika ada
        }
      }
    },
  },
});
export function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addComment(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}
export const {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpvoteComment,
  toggleDownvoteComment,
} = threadDetailSlice.actions;

export function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetail());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncToggleUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    // 1. Ubah UI secara instan
    dispatch(toggleUpvoteComment({ commentId, userId: authUser.id }));

    try {
      // 2. Tembak ke API
      const comment = getState().threadDetail.comments.find(
        (c) => c.id === commentId,
      );
      if (comment.upVotesBy.includes(authUser.id)) {
        await api.upvoteComment(threadDetail.id, commentId);
      } else {
        await api.neutralizeCommentVote(threadDetail.id, commentId);
      }
    } catch (error) {
      // 3. Rollback jika API gagal
      alert(error.message);
      dispatch(toggleUpvoteComment({ commentId, userId: authUser.id }));
    }
  };
}

// Thunk untuk Downvote Komentar
export function asyncToggleDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(toggleDownvoteComment({ commentId, userId: authUser.id }));

    try {
      const comment = getState().threadDetail.comments.find(
        (c) => c.id === commentId,
      );
      if (comment.downVotesBy.includes(authUser.id)) {
        await api.downvoteComment(threadDetail.id, commentId);
      } else {
        await api.neutralizeCommentVote(threadDetail.id, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteComment({ commentId, userId: authUser.id }));
    }
  };
}

export default threadDetailSlice.reducer;
