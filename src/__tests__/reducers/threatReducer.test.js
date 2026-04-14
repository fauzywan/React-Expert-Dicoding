import { describe, it, expect } from 'vitest';
import threadsReducer from '../../states/threads/threadsSlice';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'threads/receiveThreads',
      payload: [
        {
          id: 'thread-1',
          title: 'Thread Test 1',
          body: 'Thread 1 body',
          category: 'react',
          createdAt: '2026-04-14T10:06:55.588Z',
          ownerId: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread Test 2',
          body: 'Thread 2 body',
          category: 'redux',
          createdAt: '2026-04-14T10:06:55.588Z',
          ownerId: 'user-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload);
  });
});
