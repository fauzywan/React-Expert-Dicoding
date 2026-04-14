const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.users;
  }

  // --- API UNTUK THREADS ---
  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.threads;
  }
  async function getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.detailThread;
  }
  async function createThread({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.thread;
  }
  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    );

    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.comment;
  }

  async function upvoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      { method: 'POST' },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  }

  async function downvoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      { method: 'POST' },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  }

  async function neutralizeThreadVote(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      { method: 'POST' },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  }

  async function upvoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      { method: 'POST' },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  }

  async function downvoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      { method: 'POST' },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  }

  async function neutralizeCommentVote(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      { method: 'POST' },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  }
  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.leaderboards;
  }
  return {
    getLeaderboards,
    downvoteComment,
    upvoteComment,
    neutralizeCommentVote,
    downvoteThread,
    upvoteThread,
    neutralizeThreadVote,
    putAccessToken,
    getAccessToken,
    createComment,
    register,
    login,
    createThread,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
  };
})();

export default api;
