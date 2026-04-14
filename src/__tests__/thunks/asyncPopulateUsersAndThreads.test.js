import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from '../../states/shared/action';
import { receiveThreads } from '../../states/threads/threadsSlice'; // Sesuaikan lokasi file slice-mu
import { receiveUsers } from '../../states/users/usersSlice'; // Sesuaikan lokasi file slice-mu

const fakeThreadsResponse = [
  { id: 'thread-1', title: 'Thread 1', body: 'Body 1', category: 'react' },
];
const fakeUsersResponse = [
  { id: 'user-1', name: 'Iwan Fauzy', email: 'iwan@test.com' },
];
const fakeErrorResponse = new Error('Ups, terjadi kesalahan sistem');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;

    global.alert = vi.fn();
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;

    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(receiveUsers(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreads(fakeThreadsResponse));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
