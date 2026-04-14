import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboards/leaderboardsSlice';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <section
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: '#0056b3' }}>
          Klasemen Pengguna
        </h2>
        <p style={{ color: '#777', fontSize: '14px', marginTop: '5px' }}>
          Daftar kontributor dengan skor tertinggi di Forum
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {leaderboards.map((item, index) => (
          <div
            key={item.user.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  width: '35px',
                  color:
                    index === 0
                      ? '#ffd700'
                      : index === 1
                        ? '#c0c0c0'
                        : index === 2
                          ? '#cd7f32'
                          : '#777',
                }}
              >
                #{index + 1}
              </span>
              <img
                src={item.user.avatar}
                alt={item.user.name}
                width="45"
                height="45"
                style={{ borderRadius: '50%', border: '1px solid #eee' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '16px', color: '#333' }}>
                  {item.user.name}
                </strong>
                <span style={{ fontSize: '12px', color: '#888' }}>
                  Aktif Berdiskusi
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#0056b3',
                }}
              >
                {item.score}
              </span>
              <div
                style={{
                  fontSize: '10px',
                  color: '#999',
                  textTransform: 'uppercase',
                }}
              >
                Poin
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LeaderboardPage;
