import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

export default function PostItem({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (!session) return;
    try {
      const res = await fetch(`/api/posts/${post._id}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!session || !newComment.trim()) return;
    try {
      const res = await fetch(`/api/posts/${post._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <>
      <div className="post-header">
        <h3>{post.user.name}</h3>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
      <p>{post.content}</p>
      {post.mediaUrl && post.mediaType === 'image' && (
        <div className="post-image-container">
          <Image 
            src={post.mediaUrl} 
            alt="Post image" 
            width={500} 
            height={300} 
            layout="responsive" 
          />
        </div>
      )}
      <div className="post-actions">
        <button className="like-btn" onClick={handleLike} disabled={!session}>
          <AiFillHeart /> Like ({likes})
        </button>
        <button className="comment-btn" onClick={() => setShowComments(!showComments)}>
          <FaComment /> Comments ({comments.length})
        </button>
      </div>
      {showComments && (
        <div className="post-comments">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.user.name}: </strong>
              {comment.content}
            </div>
          ))}
          {session && (
            <form onSubmit={handleComment} className="comment-form">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit">Post</button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
