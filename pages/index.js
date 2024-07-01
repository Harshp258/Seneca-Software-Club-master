import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import PostList from '../components/PostList';
import Image from 'next/image'; 
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/posts?limit=3'); 
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

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim().length === 0) return;

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost }),
      });

      const data = await res.json();
      if (data.success) {
        setPosts(prevPosts => [data.post, ...prevPosts]);
        setNewPost('');
        setCharacterCount(0);
      } else {
        console.error('Failed to create post:', data.error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setNewPost(input);
    setCharacterCount(input.length);
  };

  return (
    <Layout>
      <div className="container">
        {session ? (
          <div className="signed-in-content">
            <div className="tech-icon">
              <Image src="/image/sen2.png" alt="Tech Icon" width={100} height={100} />
            </div>
            <h2 className="title">Welcome, {session.user.name}!</h2>
            <h3 className="subtitle" color>Discover SenecaCode and Stay Connected</h3>
            <div className="post-form">
              <form onSubmit={handlePostSubmit}>
                <textarea
                  value={newPost}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts..."
                  maxLength={280}
                />
                <div className="form-actions">
                  <span className="character-count">{characterCount}/280</span>
                  <button type="submit" disabled={newPost.trim().length === 0}>Post</button>
                </div>
              </form>
            </div>
            <div className="testimonials">
              {isLoading ? (
                <p className="loading-message">Loading posts...</p>
              ) : (
                <PostList posts={posts} limit={3} />
              )}
            </div>
            <div className="features-container">
              <h2>Explore Our Features</h2>
              <div className="feature-cards">
                <div className="feature-card">
                  <h3>Getting to Know Club Members</h3>
                  <p>Are you new to the community? Connect with members and share coding memes.</p>
                  <Link href="/members" className="btn">Club Members</Link>
                </div>
                <div className="feature-card">
                  <h3>New To-Do List Feature</h3>
                  <p>Do you keep forgetting your day-to-day schedule? Try our personal To-Do checklist.</p>
                  <Link href="/todo" className="btn">To Do Checklist</Link>
                </div>
                <div className="feature-card">
                  <h3>Checking Out the Posts and Feed</h3>
                  <p>Let&apos;s dive into the fellow members&apos; minds and thoughts. Explore the feed.</p>
                  <Link href="/feed" className="btn">Feed</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1>Welcome to Seneca Software Club</h1>
            <p>Join our community of passionate developers and innovators!</p>
            <Link href="/signup" className="btn">Join Now</Link>
            <div className="testimonials">
              {isLoading ? (
                <p className="loading-message">Loading posts...</p>
              ) : (
                <PostList posts={posts} limit={3} />
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}