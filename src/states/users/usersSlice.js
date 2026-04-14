import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    receiveUsers: (state, action) => {
      return action.payload;
    },
  },
});
export function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
      alert('Registrasi berhasil! Silakan login.');
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
}
export const { receiveUsers } = usersSlice.actions;
export default usersSlice.reducer;
