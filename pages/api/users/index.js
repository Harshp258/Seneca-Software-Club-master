import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Image from 'next/image';

export default function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    if (data.success) {
      setPosts(data.posts);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() && !mediaFile) return;

    const formData = new FormData();
    formData.append('content', newPost);
    if (mediaFile) {
      formData.append('media', mediaFile);
    }

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      // Add the new post to the beginning of the posts array
      setPosts(prevPosts => [data.post, ...prevPosts]);
      setNewPost('');
      setMediaFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
  };

  if (!session) {
    return <Layout><p>Please sign in to view the feed.</p></Layout>;
  }

  return (
    <Layout>
      <div className="feed-container">
        <h1 className="feed-title">Feed</h1>
        <form onSubmit={handlePostSubmit} className="new-post-form">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="new-post-textarea"
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,video/*"
            ref={fileInputRef}
            className="file-input"
          />
          <button type="submit" className="btn">Post</button>
        </form>
        <div className="posts-list">
          {posts.map(post => (
            <div key={post._id} className="post">
              <p>{post.content}</p>
              {post.mediaUrl && (
                post.mediaUrl.includes('video') ? (
                  <video src={post.mediaUrl} controls className="post-media" />
                ) : (
                  <Image src={post.mediaUrl} alt="Post media" width={500} height={300} className="post-media" />
                )
              )}
              <small>Posted by {post.user.name} on {new Date(post.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
