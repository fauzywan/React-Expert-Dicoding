import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../../states/authUser/authUserSlice';
import LoginInput from '../../components/LoginInput';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh] px-4">
      <div
        className="w-full max-w-md bg-white"
        style={{
          border: '1px solid #ccc',
          padding: '30px',
          borderRadius: '8px',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: '#0056b3' }}>
            Login ke Dkuz
          </h2>
          <p style={{ color: '#777', fontSize: '14px', marginTop: '5px' }}>
            Masuk untuk mulai berjejaring dan berdiskusi
          </p>
        </div>

        <LoginInput login={onLogin} />

        <p className="text-center mt-6 text-sm" style={{ color: '#555' }}>
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="font-bold hover:underline"
            style={{ color: '#0056b3' }}
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
