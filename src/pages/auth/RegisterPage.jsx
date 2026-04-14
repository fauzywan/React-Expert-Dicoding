import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../../states/users/usersSlice';
import RegisterInput from '../../components/RegisterInput';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password })).then(() => {
      navigate('/');
    });
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh] px-4 mt-5">
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
            Buat Akun Baru
          </h2>
          <p style={{ color: '#777', fontSize: '14px', marginTop: '5px' }}>
            Bergabunglah dengan komunitas Dkuz
          </p>
        </div>

        <RegisterInput register={onRegister} />

        <p className="text-center mt-6 text-sm" style={{ color: '#555' }}>
          Sudah punya akun?{' '}
          <Link
            to="/"
            className="font-bold hover:underline"
            style={{ color: '#0056b3' }}
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
