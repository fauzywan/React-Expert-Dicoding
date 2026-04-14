import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { Link } from 'react-router-dom';
import {
  asyncToggleDownvoteThread,
  asyncToggleUpvoteThread,
} from '../states/threads/threadsSlice';
import { postedAt } from '../utils/etc';

function HomePage() {
  const threads = useSelector((state) => state.threads) || [];
  const users = useSelector((state) => state.users) || [];
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const [activeCategory, setActiveCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(asyncPopulateUsersAndThreads());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const categories = Array.from(
    new Set(threads.map((thread) => thread.category)),
  );

  const filteredThreads = activeCategory
    ? threads.filter((thread) => thread.category === activeCategory)
    : threads;

  const threadList = filteredThreads.map((thread) => {
    const threadOwner = users.find((user) => user.id === thread.ownerId);
    return {
      ...thread,
      ownerName: threadOwner ? threadOwner.name : 'Unknown',
      ownerAvatar: threadOwner ? threadOwner.avatar : '',
    };
  });

  if (isLoading) {
    return (
      <section style={{ padding: '50px 20px', textAlign: 'center' }}>
        <p style={{ color: '#0056b3', fontWeight: 'bold', fontSize: '18px' }}>
          Memuat diskusi...
        </p>
      </section>
    );
  }

  return (
    <section style={{ padding: '20px' }}>
      <div className="greetings mb-5">
        <p>
          Halo, <strong>{authUser?.name}</strong>!
        </p>
        <h2 className="text-xl font-bold">
          Selamat Datang dan Selamat berjejaring
        </h2>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Link
          to="/new"
          style={{
            padding: '10px',
            backgroundColor: '#0056b3',
            color: 'white',
            fontSize: '14px',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          + Buat Diskusi Baru
        </Link>
      </div>

      <div
        className="flex justify-center"
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setActiveCategory('')}
          style={{
            padding: '5px 10px',
            fontSize: '12px',
            borderRadius: '20px',
            cursor: 'pointer',
            backgroundColor: activeCategory === '' ? '#0056b3' : '#f1f1f1',
            color: activeCategory === '' ? 'white' : 'black',
            border: activeCategory === '' ? 'none' : '1px solid #ccc',
          }}
        >
          Semua
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              fontSize: '12px',
              padding: '5px 10px',
              borderRadius: '20px',
              cursor: 'pointer',
              backgroundColor:
                activeCategory === category ? '#0056b3' : '#f1f1f1',
              color: activeCategory === category ? 'white' : 'black',
              border: activeCategory === category ? 'none' : '1px solid #ccc',
            }}
          >
            #{category}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {threadList.length === 0 && (
          <p style={{ color: '#888', textAlign: 'center' }}>
            Tidak ada diskusi yang ditemukan.
          </p>
        )}

        {threadList.map((thread) => (
          <div
            key={thread.id}
            style={{
              padding: '15px',
              borderRadius: '8px',
            }}
          >
            <Link to={`/threads/${thread.id}`} className="flex gap-3">
              <img
                src={thread.ownerAvatar}
                alt={thread.ownerName}
                width="40"
                height="40"
                style={{ borderRadius: '50%' }}
              />
              <div className="writter" style={{ lineHeight: 'unset' }}>
                <h1 className="font-bold">{thread.ownerName}</h1>
                <small>
                  <span style={{ color: '#777' }}>
                    {postedAt(thread.createdAt)}
                  </span>
                </small>
              </div>
            </Link>

            <h3
              style={{ margin: '10px 0', color: '#0056b3', fontWeight: 'bold' }}
            >
              <Link
                to={`/threads/${thread.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {thread.title}
              </Link>
            </h3>

            <p
              style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `${thread.body.substring(0, 150)}...`,
                }}
              />
            </p>
            <div
              style={{
                display: 'inline-block',
                padding: '3px 8px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                fontSize: '11px',
                marginBottom: '10px',
              }}
            >
              #{thread.category}
            </div>
            <div
              className="items-center"
              style={{
                display: 'flex',
                gap: '10px',
                fontSize: '12px',
                color: '#777',
              }}
            >
              <div
                className="gap-5"
                style={{ display: 'flex', marginTop: '10px' }}
              >
                <button
                  className="flex gap-1 items-center cursor-pointer font-bold"
                  onClick={() => dispatch(asyncToggleUpvoteThread(thread.id))}
                  style={{
                    color: thread.upVotesBy.includes(authUser?.id)
                      ? 'red'
                      : 'black',
                  }}
                >
                  {thread.upVotesBy.includes(authUser?.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  )}
                  {thread.upVotesBy.length > 0 ? thread.upVotesBy.length : ''}
                </button>
                <button
                  className="cursor-pointer flex items-center gap-2 font-bold"
                  onClick={() => dispatch(asyncToggleDownvoteThread(thread.id))}
                  style={{
                    color: thread.downVotesBy.includes(authUser?.id)
                      ? 'red'
                      : 'black',
                  }}
                >
                  {thread.downVotesBy.includes(authUser?.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                      />
                    </svg>
                  )}

                  {thread.downVotesBy.length > 0
                    ? thread.downVotesBy.length
                    : ''}
                </button>
              </div>
              <span
                className="flex items-center gap-1 mt-2 ml-2"
                style={{ color: '#777' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
                    clipRule="evenodd"
                  />
                </svg>
                {thread.totalComments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
