import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Members() {
  const [members, setMembers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchMembers();
    }
  }, [session]);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      if (data.success) {
        setMembers(data.members);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  if (!session) return (
    <Layout>
      <div className="members-container">
        <p className="sign-in-message">Please sign in to view club members.</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <br />
      <br />
      <div className="members-container">
        <h1>Our Community Members</h1>
        <div className="members-grid">
          {members.map((member, index) => (
            <div key={member._id} className="member-card">
              <span className="member-number">{index + 1}</span>
              <h2 className="member-name">{member.name}</h2>
              <p className="member-course">{member.course}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
