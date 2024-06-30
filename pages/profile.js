import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { FaUser, FaEnvelope, FaGraduationCap, FaIdCard, FaLock } from 'react-icons/fa';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    course: '',
    studentId: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/users/profile');
      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('Failed to load user data. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Profile updated successfully');
        setMessageType('success');
      } else {
        setMessage(data.message || 'Failed to update profile');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred while updating profile');
      setMessageType('error');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("New passwords don't match");
      setMessageType('error');
      return;
    }
    try {
      const res = await fetch('/api/users/password', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwords),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update password');
      }
      const data = await res.json();
      if (data.success) {
        setMessage('Password updated successfully');
        setMessageType('success');
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage(data.message || 'Failed to update password');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage(error.message || 'An error occurred while updating password');
      setMessageType('error');
    }
  };

  if (status === 'loading' || isLoading) {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (status === 'unauthenticated') {
    return null; // Router will redirect to signin page
  }

  return (
    <Layout>
      <br />
      <br />
      <div className="profile-container">
        <h1>Edit Profile</h1>
        <form onSubmit={handleProfileUpdate} className="profile-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <FaGraduationCap className="input-icon" />
            <input
              type="text"
              name="course"
              value={userData.course}
              onChange={handleInputChange}
              placeholder="Course"
            />
          </div>
          <div className="input-group">
            <FaIdCard className="input-icon" />
            <input
              type="text"
              name="studentId"
              value={userData.studentId}
              onChange={handleInputChange}
              placeholder="Student ID"
            />
          </div>
          <button type="submit" className="btn">Update Profile</button>
        </form>

        <h2>Change Password</h2>
        <form onSubmit={handlePasswordUpdate} className="password-form">
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Old Password"
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm New Password"
            />
          </div>
          <button type="submit" className="btn">Change Password</button>
        </form>

        {message && (
          <p className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
            {message}
          </p>
        )}
      </div>
    </Layout>
  );
}
