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
  
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    fetchPosts();
    
    const session = JSON.parse(localStorage.getItem('user'));
    if (session) {
      setSession(session);
    }
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

  return (
    <Layout>
      <br />
      <br />
      <div className="container">
        {session ? (
          <div className="signed-in-content">
            <div className="tech-icon">
              <Image src="/image/tech-icon.jpg" alt="Tech Icon" width={350} height={250} />
            </div>
            <h2 style={{ fontWeight: 'bold', marginTop: '20px' , fontSize: 35}}>
              Discover SenecaCode and Stay Connected
            </h2>
            <div className="testimonials">
              {isLoading ? (
                <p>Loading posts...</p>
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
                  <p>Let&apos;s dive into the fellow members minds and thoughts. Explore the feed.</p>
                  <Link href="/feed" className="btn">Feed</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Render default content for non-signed-in users
          <>
            <h1 style={{ color: 'var(--primary-red)', marginBottom: '20px' }}>
              Welcome to Seneca Software Club
            </h1>
            <p>Join our community of passionate developers and innovators!</p>
            <Link href="/signup" className="btn" style={{ marginTop: '20px' }}>
              Join Now
            </Link>
            <div className="testimonials">
              {isLoading ? (
                <p>Loading posts...</p>
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