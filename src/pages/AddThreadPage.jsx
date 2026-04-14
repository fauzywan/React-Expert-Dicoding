import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/threadsSlice';

function AddThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = async (e) => {
    e.preventDefault();

    const isSuccess = await dispatch(asyncAddThread({ title, body, category }));

    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <section style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        &larr; Batal dan Kembali
      </Link>

      <h2 style={{ marginTop: '20px' }}>Buat Diskusi Baru</h2>

      <form
        onSubmit={onAddThread}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          maxWidth: '500px',
        }}
      >
        <div>
          <label
            htmlFor="title"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Judul
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Kategori (Opsional)
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="body"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Isi Diskusi
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '8px',
              fontFamily: 'inherit',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#0056b3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Posting Diskusi
        </button>
      </form>
    </section>
  );
}

export default AddThreadPage;
