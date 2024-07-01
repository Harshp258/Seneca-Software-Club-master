import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaGraduationCap, FaUserPlus } from 'react-icons/fa'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    course: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'An error occurred during signup.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Layout className="auth-layout">
      <br />
      <br />
      <div className="auth-container">
        <h1>Join Our Community</h1>
        <p className="auth-subtitle">Create your account to get started</p>
        {success ? (
          <div className="success-message">
            <p>Account created successfully! You can now <Link href="/signin">sign in</Link>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaIdCard className="input-icon" />
              <input
                type="text"
                name="studentId"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaGraduationCap className="input-icon" />
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <FaUserPlus /> Sign Up
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
        <div className="auth-switch">
          <p>Already have an account?</p>
          <Link href="/signin" className="btn btn-secondary">
            Sign In
          </Link>
        </div>
      </div>
    </Layout>
  )
}
