import Layout from '../components/Layout'
import { useState } from 'react'
import Link from 'next/link'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
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
        setError(data.message || 'An error occurred during signup.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Layout>
      <div className="auth-container">
        <h1 style={{ color: 'var(--primary-red)', marginBottom: '20px' }}>Sign Up</h1>
        {success ? (
          <div>
            <p>Account created successfully! You can now <Link href="/signin">sign in</Link>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn">Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
