import PostItem from './PostItem.js';

export default function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}