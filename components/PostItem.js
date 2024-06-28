import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

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
    <div>
      <div>
        <h3>{post.user.name}</h3>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
      <p>{post.content}</p>
      {post.mediaUrl && (
        <div>
          {post.mediaType === 'video' ? (
            <video src={post.mediaUrl} controls width="100%" />
          ) : (
            <Image src={post.mediaUrl} alt="Post media" width={500} height={300} layout="responsive" />
          )}
        </div>
      )}
      <div>
        <button onClick={handleLike} disabled={!session}>
          Like ({likes})
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          Comments ({comments.length})
        </button>
      </div>
      {showComments && (
        <div>
          {comments.map((comment, index) => (
            <div key={index}>
              <strong>{comment.user.name}: </strong>
              {comment.content}
            </div>
          ))}
          {session && (
            <form onSubmit={handleComment}>
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
    </div>
  );
}
