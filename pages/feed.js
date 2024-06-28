import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';

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
      <div>
        <h1>Feed</h1>
        {session && <PostForm onPostCreated={handleNewPost} />}
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map(post => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </Layout>
  );
}
