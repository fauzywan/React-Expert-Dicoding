import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onLogin} className="flex flex-col gap-4">
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
          placeholder="Masukkan password"
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
        Masuk
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
