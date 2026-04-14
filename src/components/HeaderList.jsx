import React from 'react';
import { Link } from 'react-router-dom';

function HeaderList() {
  return (
    <nav className="flex gap-5">
      <Link to="/" className="hover:text-blue-500">
        Home
      </Link>
      <Link to="/leaderboards" className="hover:text-blue-500">
        Leaderboard
      </Link>
      <Link to="/new" className="hover:text-blue-500">
        New Thread
      </Link>
    </nav>
  );
}

export default HeaderList;
