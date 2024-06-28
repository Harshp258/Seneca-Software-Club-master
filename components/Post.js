import { useState } from 'react';
import Image from 'next/image';

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [shares, setShares] = useState(post.shares);
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
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
    if (!newComment.trim()) return;

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

  const handleShare = async () => {
    try {
      const res = await fetch(`/api/posts/${post._id}/share`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setShares(data.shares);
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.user.name}</h3>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
      <p>{post.content}</p>
      {post.mediaUrl && (
        post.mediaType === 'video' ? (
          <video src={post.mediaUrl} controls className="post-media" />
        ) : (
          <Image src={post.mediaUrl} alt="Post media" width={500} height={300} className="post-media" />
        )
      )}
      <div className="post-actions">
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleShare}>Share ({shares})</button>
      </div>
      <div className="post-comments">
        <h4>Comments ({comments.length})</h4>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user.name}: </strong>
            {comment.content}
          </div>
        ))}
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}
