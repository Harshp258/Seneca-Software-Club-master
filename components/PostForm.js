import { useState } from 'react';

export default function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!content.trim() && !imageFile) || isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('content', content);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onPostCreated(data.post);
        setContent('');
        setImageFile(null);
        if (e.target.image) {
          e.target.image.value = '';
        }
      } else {
        console.error('Failed to create post:', data.error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
        placeholder="Share your thoughts..."
        maxLength={maxLength}
      />
      <div className="character-count">
        {content.length}/{maxLength}
      </div>
     
        <button type="submit" disabled={isLoading || (content.length === 0 && !imageFile)}>
          {isLoading ? 'Posting...' : 'Post'}
        </button>
    
    </form>
  );
}
