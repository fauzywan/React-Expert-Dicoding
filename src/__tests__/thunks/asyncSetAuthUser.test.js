import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  setAuthUser,
} from '../../states/authUser/authUserSlice';

const fakeAuthToken = 'fake-token';
const fakeUserResponse = {
  id: 'user-1',
  name: 'Iwan Fauzy',
  email: 'iwan@test.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeErrorResponse = new Error('Ups, email atau password salah');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken; // <-- Kita tambahkan ini

    global.alert = vi.fn();
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken; // <-- Kita kembalikan ini

    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;

    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeAuthToken);
    api.getOwnProfile = () => Promise.resolve(fakeUserResponse);
    api.putAccessToken = vi.fn(); // <-- Mock fungsinya agar tidak crash
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'iwan@test.com', password: 'password123' })(
      dispatch,
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUserResponse));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({
      email: 'iwan@test.com',
      password: 'wrongpassword',
    })(dispatch);

    // assert
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
