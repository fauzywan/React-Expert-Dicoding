import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/isPreloadSlice';

import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/auth/LoginPage';
import AddThreadPage from './pages/AddThreadPage';
import RegisterPage from './pages/auth/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/authUserSlice';
import LeaderboardPage from './pages/LeaderboardPage';
import HeaderList from './components/HeaderList';

function App() {
  const { authUser, isPreload } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);
  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };
  if (isPreload) {
    return (
      <div className="loading-container">
        <span className="loader"></span>
        <p style={{ marginLeft: '10px' }}>Menghubungkan ke server...</p>
      </div>
    );
  }
  if (authUser === null) {
    return (
      <main>
        <Routes>
          {/* Jika belum login, halaman utama diarahkan ke Login */}
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <>
      <header className="flex justify-between items-center p-5 ">
        <Link to="/" className="font-bold hover:text-blue-700 ">
          Dkuz
        </Link>
        <HeaderList />

        <button onClick={onLogout} className="cursor-pointer">
          Logout
        </button>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/new" element={<AddThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
