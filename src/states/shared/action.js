import api from '../../utils/api';
import { receiveUsers } from '../users/usersSlice';
import { receiveThreads } from '../threads/threadsSlice';
export function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);

      dispatch(receiveUsers(users));
      dispatch(receiveThreads(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}
