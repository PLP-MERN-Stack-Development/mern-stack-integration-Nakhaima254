// client/src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
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

// client/src/pages/Index.jsx
import { useEffect, useState } from 'react';
import { getPosts } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [posts, setPosts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        toast({
          title: 'Error',
          description: err.message,
          variant: 'destructive'
        });
      }
    };
    fetchPosts();
  }, []);

  // Rest of the component
};

export default Index;