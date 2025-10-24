const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const createPost = async (data) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
};

export const getPost = async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
};

export const updatePost = async (id, data) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
};
