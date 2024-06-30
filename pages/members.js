import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMembers();
    }
  }, [status]);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      if (data.success) {
        setMembers(data.members);
        setDisplayedMembers(data.members.slice(0, 20));
        setLoadMore(data.members.length > 20);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const currentLength = displayedMembers.length;
    const more = members.slice(currentLength, currentLength + 20);
    setDisplayedMembers([...displayedMembers, ...more]);
    if (currentLength + 20 >= members.length) {
      setLoadMore(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (status === 'unauthenticated') {
    return <Layout><p>Please sign in to view club members.</p></Layout>;
  }

  return (
    <Layout>
      <div className="members-container">
        <h1>Club Members</h1>
        {members.length > 0 ? (
          <>
            <div className="members-grid">
              {displayedMembers.map((member, index) => (
                <div key={member._id} className="member-card">
                  <span className="member-number">#{index + 1}</span>
                  <h2 className="member-name">{member.name}</h2>
                  <p className="member-course">{member.course}</p>
                </div>
              ))}
            </div>
            {loadMore && (
              <button onClick={handleLoadMore} className="load-more-btn">
                Load More
              </button>
            )}
          </>
        ) : (
          <p>No members found.</p>
        )}
      </div>
    </Layout>
  );
}
