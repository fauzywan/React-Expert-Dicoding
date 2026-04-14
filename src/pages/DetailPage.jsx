import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../states/threads/threadDetailSlice';
import { postedAt } from '../utils/etc';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await dispatch(asyncReceiveThreadDetail(id));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id, dispatch]);

  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAddComment({ threadId: id, content: commentText }));
    setCommentText('');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0056b3]"></div>
        <p className="font-bold text-[#0056b3]">Menjemput Diskusi...</p>
      </div>
    );
  }

  if (!threadDetail) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center p-5">
        <h1 className="text-5xl mb-4">🔍</h1>
        <h2 className="text-xl font-bold mb-2">Diskusi Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-5">
          Sepertinya diskusi yang kamu cari sudah dihapus atau link-nya salah.
        </p>
        <Link
          to="/"
          className="bg-[#0056b3] text-white px-6 py-2 rounded-md font-bold no-underline"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <section style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: '#0056b3',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '20px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          style={{ width: '16px' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Kembali ke Beranda
      </Link>

      <div
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: 'white',
        }}
      >
        <div className="flex gap-3 mb-4">
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
            width="45"
            height="45"
            style={{ borderRadius: '50%' }}
          />
          <div style={{ lineHeight: '1.2' }}>
            <h1 className="font-bold">{threadDetail.owner.name}</h1>
            <small style={{ color: '#777' }}>
              {postedAt(threadDetail.createdAt)}
            </small>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">{threadDetail.title}</h2>
        <div
          style={{ lineHeight: '1.6', color: '#333', marginBottom: '20px' }}
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
        <div
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '15px',
          }}
        >
          #{threadDetail.category}
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 className="font-bold mb-3 text-lg">Beri Komentar</h3>
        <form onSubmit={onCommentSubmit}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Apa pendapatmu mengenai diskusi ini?"
            style={{
              width: '100%',
              padding: '15px',
              minHeight: '120px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'inherit',
            }}
            required
          />
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '10px 25px',
              backgroundColor: '#0056b3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Kirim Komentar
          </button>
        </form>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3
          className="font-bold mb-5 text-lg border-bottom pb-2"
          style={{ borderBottom: '1px solid #eee' }}
        >
          Komentar ({threadDetail.comments.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {threadDetail.comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                paddingBottom: '20px',
                borderBottom: '1px solid #f1f1f1',
              }}
            >
              <div className="flex gap-3 mb-2">
                <img
                  src={comment.owner.avatar}
                  alt={comment.owner.name}
                  width="32"
                  height="32"
                  style={{ borderRadius: '50%' }}
                />
                <div style={{ lineHeight: '1.1' }}>
                  <h4 className="font-bold text-sm">{comment.owner.name}</h4>
                  <small style={{ color: '#999', fontSize: '11px' }}>
                    {postedAt(comment.createdAt)}
                  </small>
                </div>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#444',
                  marginLeft: '44px',
                  marginBottom: '10px',
                }}
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />

              <div style={{ marginLeft: '44px', display: 'flex', gap: '15px' }}>
                <button
                  onClick={() => dispatch(asyncToggleUpvoteComment(comment.id))}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: comment.upVotesBy.includes(authUser?.id)
                      ? '#0056b3'
                      : '#777',
                    fontWeight: comment.upVotesBy.includes(authUser?.id)
                      ? 'bold'
                      : 'normal',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      comment.upVotesBy.includes(authUser?.id)
                        ? 'currentColor'
                        : 'none'
                    }
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: '18px' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398.306-.774 1.086-1.227 1.918-1.227h1.053c.472 0 .745.556.5.96a8.95 8.95 0 0 0-.303.54"
                    />
                  </svg>
                  {comment.upVotesBy.length}
                </button>

                <button
                  onClick={() =>
                    dispatch(asyncToggleDownvoteComment(comment.id))
                  }
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: comment.downVotesBy.includes(authUser?.id)
                      ? '#dc3545'
                      : '#777',
                    fontWeight: comment.downVotesBy.includes(authUser?.id)
                      ? 'bold'
                      : 'normal',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      comment.downVotesBy.includes(authUser?.id)
                        ? 'currentColor'
                        : 'none'
                    }
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: '18px' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0-.303.54"
                    />
                  </svg>
                  {comment.downVotesBy.length}
                </button>
              </div>
            </div>
          ))}

          {threadDetail.comments.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
              Belum ada komentar. Jadilah yang pertama!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
