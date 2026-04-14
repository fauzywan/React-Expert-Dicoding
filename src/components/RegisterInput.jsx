import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={onRegister} className="flex flex-col gap-4">
      <div>
        <label className="block mb-1 font-bold text-sm text-gray-700">
          Nama Lengkap
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          className="w-full outline-none focus:ring-2 focus:ring-[#0056b3]"
          style={{
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-sm text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          required
          className="w-full outline-none focus:ring-2 focus:ring-[#0056b3]"
          style={{
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-sm text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimal 6 karakter"
          required
          className="w-full outline-none focus:ring-2 focus:ring-[#0056b3]"
          style={{
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <button
        type="submit"
        className="w-full font-bold cursor-pointer transition-opacity hover:opacity-90 mt-2"
        style={{
          padding: '12px',
          backgroundColor: '#0056b3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Daftar Sekarang
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
