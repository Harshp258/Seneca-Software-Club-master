import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

export default function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        console.error('Failed to fetch posts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <Layout>
      <br />
      <br />
      <div className="feed-container">
        <h1>Feed</h1>
        {session && (
          <div className="post-prompt">
            <h2>What is new in Tech World?</h2>
            <PostForm onPostCreated={handleNewPost} />
          </div>
        )}
        {isLoading ? (
          <p className="loading-message">Loading posts...</p>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </Layout>
  );
}
